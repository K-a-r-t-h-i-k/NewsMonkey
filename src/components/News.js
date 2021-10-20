import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `News Monkey - ${this.capitalizeFirstLetter(props.category)}`;
  }

  UpdateNews = (pageValue) => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&page=${pageValue}&pagesize=${this.props.pageSize}&category=${this.props.category}&apiKey=${this.props.apiKey}`;
    this.setState({ loading: true });
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ articles: data.articles, loading: false, page: pageValue }))
      .catch((err) => console.log(err));
  };

  async componentDidMount() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&page=${this.state.page}&pagesize=${this.props.pageSize}&category=${this.props.category}&apiKey=${this.props.apiKey}`;
    let data = await fetch(url);
    this.props.setProgress(40);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults });
    this.props.setProgress(100);
  }
  handleNext = () => {
    this.UpdateNews(this.state.page + 1);
  };
  handlePrevious = () => {
    this.UpdateNews(this.state.page - 1);
  };
  render() {
    return (
      <div>
        <div className="container">
          <h2 className="text-center" style={{margin: "80px 0px 30px 0px"}}> News Monkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h2>
          {this.state.loading && <Spinner />}
          <div className="row">
            {!this.state.loading &&
              this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} source={element.source.name} author={element.author} date={element.publishedAt} />
                  </div>
                );
              })}
          </div>
          <div className="d-flex justify-content-between pb-3">
            {this.state.page !== 1 && (
              <button className="btn btn-dark" onClick={this.handlePrevious}>
                &larr; Previous
              </button>
            )}
            {this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize) && (
              <button className="btn btn-dark" onClick={this.handleNext}>
                Next &rarr;
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default News;
