import React from 'react';
import ReactDOM from 'react-dom';

class Customer extends React.Component {
    render() {
        return (
            <div className="customer">
                <h1>Customer Page</h1>
                <label>Welcome to Gmall</label>
                <h2>Here`s the product</h2>
                <ProductShowList products={phoneList} />
                <ProductShowList products={tvList} />
                <h2>Please choose your favourite</h2>
                <ChooseProductForm products={phoneList} name="cellphone" />
                <ChooseProductForm products={tvList} name="tv" />
                <h2>FilterableProductTable</h2>
                <FilterableProductTable />
            </div>
        );
    }
}

class ChooseProductForm extends React.Component {
    render() {
        const products = this.props.products;
        const name = this.props.name;
        const productList = products.map((item) =>
            <div key={item.id}><input type="radio" name={name} value={item.name} />{item.name}</div>
        );

        return (
            <form method="post" action="http://localhost:8080/chooseProduct">
                {productList}
                <div><input type="submit" value="Add to Chart" /></div>
            </form>
        );
    }
}

const phoneList = [
    { id: "1", name: "iphone11" },
    { id: "2", name: "iphone10" },
    { id: "3", name: "iphone9" },
    { id: "4", name: "iphone8" },
    { id: "5", name: "mate30" },
    { id: "6", name: "mate20" },
    { id: "7", name: "p30" },
    { id: "8", name: "p20" }
]

const tvList = [
    { id: "1", name: "Sony" },
    { id: "2", name: "Xiaomi" },
    { id: "3", name: "Huawei" },
    { id: "4", name: "Sharp" },
    { id: "5", name: "Samsung" },
    { id: "6", name: "Skyworth" }
]

class ProductShowList extends React.Component {
    render() {
        const products = this.props.products;
        const productList = products.map((item) => <li key={item.id}>{item.name}</li>);
        return (
            <div className="product-list"><ul>{productList}</ul></div>
        );
    }
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onlyShowStockInd: false,
            searchProductName: "",
        }

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(e) {
        // console.log("e.target.checked : ",e.target.checked);
        this.setState({
            onlyShowStockInd: e.target.checked,
        })
    }

    handleOnChange(e) {
        // console.log("e.target.value : ",e.target.value);
        this.setState({
            searchProductName: e.target.value,
        })
    }

    render() {
        return (
            <div className="filterable-product-table">
                <SearchBar handleOnClick={this.handleOnClick} handleOnChange={this.handleOnChange} />
                <ProductTable products={FilterableProductList} onlyShowStockInd={this.state.onlyShowStockInd} searchProductName={this.state.searchProductName} />
            </div>
        );
    }
}

class SearchBar extends React.Component {
    render() {
        const onlyShowStockText = "Only show products in stock";
        return (
            <div className="search-bar">
                <form>
                    <input type="text" name="seachProduct" placeholder="Search..." onChange={this.props.handleOnChange} />
                    <p><input type="checkbox" name="checkedOnlyShowStock" onChange={this.props.handleOnClick} />{onlyShowStockText}</p>
                </form>

            </div>
        );
    }
}

class ProductTable extends React.Component {
    tableRowDisplayControl(products) {
        let lastCategory = null;
        let rows = [];
        products.forEach(product => {
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
            }

            if (this.props.onlyShowStockInd) {
                if (product.stock === 'Y') {
                    if (this.props.searchProductName !== "") {
                        if (product.name === this.props.searchProductName) {
                            rows.push(<ProductRow name={product.name} price={product.price} stock={product.stock} key={product.name} />);
                        }
                    } else {
                        rows.push(<ProductRow name={product.name} price={product.price} stock={product.stock} key={product.name} />);
                    }
                }
            } else {
                if (this.props.searchProductName !== "") {
                    if (product.name === this.props.searchProductName) {
                        rows.push(<ProductRow name={product.name} price={product.price} stock={product.stock} key={product.name} />);
                    }
                } else {
                    rows.push(<ProductRow name={product.name} price={product.price} stock={product.stock} key={product.name} />);
                }
            }

            lastCategory = product.category;
        }
        );
        return rows;
    }

    render() {
        const products = this.props.products;
        let rows = this.tableRowDisplayControl(products);
        return (
            <table>
                <thead>
                    <tr><th>Name</th><th>Price</th><th>Stock</th></tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}

class ProductCategoryRow extends React.Component {
    render() {
        return (
            <tr>
                <td><i>{this.props.category}</i></td>
            </tr>
        );
    }
}

class ProductRow extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.price}</td>
                <td>{this.props.stock}</td>
            </tr>
        );
    }
}

const FilterableProductList = [
    { category: "Sporting Goods", name: "Football", price: "$49.99", stock: "N" },
    { category: "Sporting Goods", name: "Baseball", price: "$9.99", stock: "N" },
    { category: "Sporting Goods", name: "Basketball", price: "$29.99", stock: "Y" },
    { category: "Electronics", name: "iPod Touch", price: "$99.99", stock: "N" },
    { category: "Electronics", name: "iphone 5", price: "$399.99", stock: "Y" },
    { category: "Electronics", name: "Nexus 7", price: "$199.99", stock: "N" },
    { category: "Electronics", name: "Nexus 8", price: "$199.99", stock: "Y" },
    { category: "Book", name: "TextBook1", price: "$199.99", stock: "Y" },
    { category: "Book", name: "TextBook2", price: "$199.99", stock: "N" },
    { category: "Book", name: "TextBook3", price: "$199.99", stock: "Y" },
    { category: "Book", name: "TextBook4", price: "$199.99", stock: "N" },
]

export default Customer;