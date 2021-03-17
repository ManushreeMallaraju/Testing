import axios from "axios";
import React, { Component } from "react"
import {connect} from 'react-redux'

const URL = "http://localhost:3000/storeBlog"
class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            blog:'',
            submitted: false,
            registerSuccessful: false,
            existUser:false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goToBlog = this.goToBlog.bind(this);
    }

    handleChange(e) {

        const { name, value } = e.target;
        this.setState({ [name]: value , registerSuccessful : false,existUser:false });
    }

    handleSubmit(e) {
            e.preventDefault();
            this.setState({ submitted: true});
            const {name, blog } = this.state;
            if (name && blog) {
                const userList = this.props.user;

                if(!userList.includes(name)){
                

                    this.props.dispatch({
                        type:"REGISTERED",
                        user:name
                    })
                    let payload = {
                        name : name,
                        blog:blog
                    }
                    axios.post(URL, payload).then(res =>{
                        console.log(res.data)
                        this.setState({registerSuccessful:true})
                    })
                    e.target.reset();
                   this.setState({name:"",blog:"",submitted:false})
                }else{
                    this.setState({existUser:true})
                }
               
            }
    }

    goToBlog(){
        this.props.history.push("/blog")
    }

    render() {

        const {submitted, name, blog, registerSuccessful,existUser} = this.state;

        return (
            <div className="row d-flex justify-content-center">
                <div className="col-sm-10 col-md-6 col-lg-4 mt-5 login-wrapper">
               <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !name ? ' has-error' : '')}>
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" name="name" value={this.props.name} onChange={this.handleChange} />
                        {submitted && !name &&
                            <div className="help-block">Name is required</div>
                        }
                    </div>
                 
                    <div className={'form-group' + (submitted && !blog ? ' has-error' : '')}>
                        <label htmlFor="Blog">Blog</label>
                        <textarea rows="5" cols="50" className="form-control" name="blog" value={blog} onChange={this.handleChange} ></textarea>    
                        {submitted && !blog &&
                            <div className="help-block">Field is required</div>
                        }
                    </div>
                    <div className="form-group d-flex justify-content-between">
                        <div>
                        <button className="btn btn-primary" name="register">Register</button>
                        {registerSuccessful &&
                            <p className="success">Registered Successful</p>}
                             {existUser &&
                            <p className="text-danger">User already exist</p>}
                        </div>

                    </div>
                </form>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-danger w-50" onClick={this.goToBlog}>Read the blogs</button>
                    </div>
                </div>   

            </div>
        )
    }
}

const mapStateToProps = state =>({
    user : state.user
})


export default connect(mapStateToProps)(Login);