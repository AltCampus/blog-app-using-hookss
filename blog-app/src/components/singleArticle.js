import React from "react";
import Hero from "./hero";

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
    };
  }
  componentDidMount() {
    const slug = this.props.match.params.slug;
    fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles/${slug}`)
      .then((res) => res.json())
      .then((article) => {
        this.setState({
          article: article,
        });
      });
  }
  render() {
    let article;
    if (this.state.article) {
      article = this.state.article.article;
    }
    return (
      <div>
        {this.state.article ? (
          <>
            <Hero title={article.title} description={article.author.username} />
            <div className="mx-8 my-4">
              <img
                className="h-20 w-20 my-4 inline-block rounded-full"
                src={article.author.image}
                alt={article.author.username}
              ></img>
              <p className="text-lg py-4">{article.description}</p>
              <p className="text-lg py-4">{article.body}</p>
              <p className="text-lg py-4">{article.slug}</p>
              <p className="text-lg py-4">Tags: {article.tagList}</p>
              <p className="text-lg py-4">
                {article.createdAt.substring(0, 10)}
              </p>
              <div>
                <a
                  href="/"
                  className="rounded-lg my-4 inline-block border-solid border-2 border-green-600 py-1 px-2"
                >
                  💚{" "}
                  <span className="text-sm text-green-600">
                    {article.favoritesCount}
                  </span>
                </a>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default Article;
