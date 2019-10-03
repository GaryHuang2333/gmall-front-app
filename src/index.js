import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Seller from './SellerPage';
import Login from './LoginPage';
import Customer from './CustomerPage';

class ChoosePage extends React.Component {
    render() {
        return (
            <div>
                <button name="loginPage" onClick={this.props.handleOnClick}>Login page</button>
                <button name="customerPage" onClick={this.props.handleOnClick}>Customer page</button>
                <button name="sellerPage" onClick={this.props.handleOnClick}>Seller page</button>
            </div>
        );
    }
}


class Index extends React.Component {
    render() {
        const headerChildren = <p>Welcome To GMall</p>;
        const footerChildren = <p>Copyright @ 2019 Gary</p>;
        return (
            <div className="index">
                <Frame name="header" children={headerChildren} />
                <Frame name="body" children={<MainBody />} />
                <Frame name="footer" children={footerChildren} />
            </div>

        );
    }
}

class MainBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPage: "loginPage" //loginPage sellerPage customerPage
        }
        this.handleOnClick = this.handleOnClick.bind(this);
        this.showPage = this.showPage.bind(this);
    }

    handleOnClick(event) {
        console.log("event.target.name", event.target.name);
        this.setState({
            showPage: event.target.name
        })
    }

    showPage2() {
        const pageInd = this.state.showPage;
        console.log("this.state", this.state);
        let returnPage;
        switch (pageInd) {
            case "loginPage": returnPage = <Login />; break;
            case "sellerPage": returnPage = <Seller />; break;
            case "customerPage": returnPage = <Customer />; break;
            default: returnPage = null;
        }
        return returnPage;
    }

    showPage() {
        console.log("this.state", this.state);
        let returnPage;

        this.state.showPage === "loginPage" ? returnPage = <Login /> :
            this.state.showPage === "sellerPage" ? returnPage = <Seller /> :
                this.state.showPage === "customerPage" ? returnPage = <Customer /> : returnPage = <Login />
        return returnPage;
    }

    render() {
        return (
            <div className="main-body">
                <div><Frame name="main-body left-sidebar" />
                    <p>This is left sidebar</p>
                    <ChoosePage handleOnClick={this.handleOnClick} />
                </div>
                <div><Frame name="main-body body" />
                    {/* {
                        (this.state.showPage === "loginPage" ? <Login /> :
                            (this.state.showPage === "sellerPage" ? <Seller /> :
                                (this.state.showPage === "customerPage" ? <Customer /> : <Login />)
                            )
                        )
                    } */}
                    {this.showPage()}
                </div>
                <div><Frame name="main-body right-sidebar" children="this is right side bar" /></div>
            </div>
        );
    }
}

class Frame extends React.Component {
    render() {
        return (
            <div className={this.props.name}>
                {this.props.children}
            </div>
        );
    }
}

ReactDOM.render(
    <Index />,
    document.getElementById('root')
);
