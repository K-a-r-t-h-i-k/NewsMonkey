import React, { Component } from "react";

export class NewsItem extends Component {
  textTruncate = (text, noOfChars, nullText) => {
    if (text) return text.length < noOfChars ? text.length : text.slice(0, noOfChars) + " ...";
    else return nullText;
  };

  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <>
        <div className="card mb-4" style={{ width: "22rem", height: "475px", border: "4px solid black" }}>
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ zIndex: 1 ,left:"90%" }}>
            {source}
          </span>
          <img src={imageUrl ? imageUrl : "https://cdn.browshot.com/static/images/not-found.png"} className="card-img-top" alt="..." style={{ height: "200px" }} />
          <div className="card-body">
            <h5 className="card-title">{this.textTruncate(title, 50, "No Title")}</h5>
            <p className="card-text">{this.textTruncate(description, 100, "No Description")}</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "Unknown"} on {new Date(date).toUTCString()}
              </small>
            </p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">
              Read more..
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default NewsItem;
