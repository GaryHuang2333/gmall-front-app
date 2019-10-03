import React from 'react';
import ReactDOM from 'react-dom';


class Seller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productName: "",
            unitPrice: "",
            quantity: 0,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        // this.handleProductNameOnChange = this.handleProductNameOnChange.bind(this);
        // this.handleUnitPriceOnChange = this.handleUnitPriceOnChange.bind(this);
        this.handleQuantityOnChange = this.handleQuantityOnChange.bind(this);
    }

    handleSubmit(event) {
        // TODO temerary prevent goto another page when submit
        alert("Submit success");
        event.preventDefault();
    }

    // handleProductNameOnChange(event){
    //     console.log("this", this);
    //     this.setState({productName : event.target.value});
    // }

    // handleUnitPriceOnChange(event){
    //     console.log("this", this);
    //     this.setState({unitPrice : event.target.value});
    // }

    // TODO how son component pass value to father component
    handleQuantityOnChange(event) {
        console.log("this", this);
        this.setState({ quantity: event.target.value });
    }

    handleOnChange(event) {
        console.log("event : ", event);
        console.log("event.target : ", event.target);
        console.log("event.target.type : ", event.target.type);
        console.log("event.target.select : ", event.target.select);
        console.log("event.target.selected : ", event.target.selected);
        console.log("event.target.value : ", event.target.value);
        console.log("event.target.name : ", event.target.name);
        const name = event.target.name;
        const value = event.target.value;
        // according to
        switch (name) {
            case "productName": this.setState({ productName: value }); break;
            case "unitPrice": this.setState({ unitPrice: value }); break;
            case "quantity": this.setState({ quantity: value }); break;
            default: break;
        }
    }

    render() {
        return (
            <div className="seller">
                <h1>Seller Page</h1>
                <div><label>upload product</label></div>
                <form onSubmit={this.handleSubmit}>
                    <div>Product Name : <input type="text" name="productName" placeholder="please input product name" onChange={this.handleOnChange} /></div>
                    <div>Unit Price : <input type="text" name="unitPrice" placeholder="please input product price" onChange={this.handleOnChange} /></div>
                    <QuantitySelection list={quantityList} quantity={this.state.quantity} handleOnChange={this.handleOnChange} />
                    <input type="submit" name="UPLOAD" />
                </form>
                <div className="show-product">
                    <label>Show Product</label>
                    <div>Product Name : {this.state.productName}</div>
                    <div>Unit Price : {this.state.unitPrice}</div>
                    <div>Quantity : {this.state.quantity}</div>
                </div>
                <ProductName productName={this.state.productName} handleOnChange={this.handleOnChange} />
            </div>
        );
    }
}

const quantityList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
class QuantitySelection extends React.Component {
    render() {
        const quantityList = this.props.list;
        const list = quantityList.map(item => <option key={item}>{item}</option>);
        return (
            <div className="quantity-list">
                <select value={this.props.quantity} onChange={this.props.handleOnChange} name="quantity">
                    {list}
                </select>
            </div>
        )
    }
}

class ProductName extends React.Component {
    render() {
        return (
            <div>ProductName : <input name="productName" type="text" onChange={this.props.handleOnChange} />&nbsp;{this.props.productName}</div>
        );
    }
}
export default Seller;