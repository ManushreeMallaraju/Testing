import React, { Component } from 'react'
import axios from "axios"


class NewsArticle extends Component {

    constructor(props) {
        super(props)
        this.state = {
            articleList: []
        }
        this.backToBlog = this.backToBlog.bind(this)
    }

    componentDidMount() {
        const url = "https://newsapi.ai/api/v1/article/getArticles?query=%7B%22%24query%22%3A%7B%22keyword%22%3A%22economy%20and%20technology%22%2C%22keywordLoc%22%3A%22body%22%7D%7D&dataType=news&resultType=articles&articlesSortBy=date&articlesCount=100&articleBodyLen=-1&apiKey=abbfc01f-d12a-4258-8525-df84d64d17a1"

        axios.get(url).then(res => {
            console.log(res.data);
            const { results } = res.data.articles;
            if (results) {
                this.setState({ articleList: results })
            }
        })
    }

    backToBlog(){
        this.props.history.push("/blog")
    }

    render() {
        const { articleList } = this.state;
        const articleContent = articleList.map((ele,index) => {

            return <div className="col-sm-4 mb-5" key={index} >
                <a className="article-wrapper" href={ele.url} target="_blank" rel="noreferrer">
                    <img src={ele.image} alt="blog"/> 
                    <h4>{ele.title}</h4>
                    <p className="text-justify">{ele.body}</p>
                </a>

            </div>
        })
        return (
            <>
                <div className="mt-4 d-flex justify-content-between">
                    <button className="btn btn-secondary" onClick={this.backToBlog}>Prev</button>  
                </div> 
                <h2 className="text-center my-5">Economy and Business Live update</h2>
                <div className="row">
                   {articleContent}
                </div>
            </>

        );
    }
}

export default NewsArticle;