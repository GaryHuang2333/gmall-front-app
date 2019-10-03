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

export default Customer;