import axios from "axios"
import React, { Component } from "react"
import { connect } from "react-redux"

class Blog extends Component {

    constructor(props) {
        console.log(props)
        super(props)
        this.state = {

            userList :this.props.user,
            blogData:[]
            }

        this.backtoLogin = this.backtoLogin.bind(this);
        this.gotoNews = this.gotoNews.bind(this);
    }

    backtoLogin() {
        this.props.history.push("/login")
    }

    gotoNews() {
        this.props.history.push("/news")
    }

    componentDidMount(){

        let userList = this.props.user;
        const url = `http://localhost:3000/storeBlog/${userList.join(",")}`
        axios.get(url).then(res =>{
            console.log(res)
            this.setState({blogData : res.data})
        })
    }

    render() {
            const {userList, blogData} = this.state;
        const header =userList.map((ele,index) =>{

            return  ele ? <li className="nav-item" key={index}>
            <a className={"nav-link " + (index === 0 ? ' active' : '')} data-toggle="pill" href={"#"+ele} role="tab" aria-controls={"pills-"+ele} aria-selected="true">{ele}</a>
        </li> : ''
        })
        const bodyContent =blogData.map((ele,index) =>{
            return  userList.includes(ele.name) ? <div key={index} className={"tab-pane fade"+ (index === 0 ? ' show active' : '')} id={ele.name} role="tabpanel" aria-labelledby={ele.name+"-tab"}>{ele.blog}</div> : ""
        })
        return (
            <>
                <div className="row d-flex justify-content-between m-3 ">
                    <button className="btn btn-secondary" onClick={this.backtoLogin}>Prev</button>
                    <button className="btn btn-secondary" onClick={this.gotoNews}>Next</button>
                </div>
                <div className="row d-flex justify-content-center ">
                    <div className="col-sm-11 col-md-8 col-lg-6 blog-wrapper">
                        <ul className="nav nav-pills">
                            {header}
                
                        </ul>
                        <div className="tab-content mt-3">
                            {bodyContent}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state =>({
    user : state.user
})

export default connect(mapStateToProps)(Blog);