const rout = require("express").Router();
const blogData = require("../Middleware/filterData");
const ldsh = require("lodash");
// const ldsh = require("lodash");

// const cacheDuration = 5 * 60 * 1000;
// const cache = {};

// const memoizedCalculateAnalytics = ldsh.memoize(
//   calculateAnalytics,
//   null,
//   cacheDuration
// );
rout.get("/blog-stats", blogData, (req, res) => {
  try {
    const data = req.data.blogs;

    // 2
    const titlesArray = [];
    data.map((blog) => {
      titlesArray.push(blog.title);
    });
    console.log(titlesArray);
    const logestTitle = ldsh.maxBy(titlesArray, (str) => str.length);

    // 3
    const noBlogsWithPrivacyWorld = ldsh.filter(titlesArray, (title) =>
      title.toLowerCase().includes("privacy")
    ).length;

    // 4
    const uniqueBlogs = [];
    uniqueBlogs.push(ldsh.uniqBy(data, "title").map((blog) => blog.title));

    const analysis = {
      "Total number of blogs": data.length,
      "The title of the longest blog": logestTitle,
      " Number of blogs with 'privacy' in the title.": noBlogsWithPrivacyWorld,
      "Unique Blogs ": uniqueBlogs,
    };
    const memoizedCalculateAnalytics = ldsh.memoize(
      analysis,
      null,
      cacheDuration
    );

    return res.status(200).json(analysis);
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
});

rout.get("/blog-search/:title", blogData, (req, res) => {
  try {
    const title = req.params.title.toLowerCase();
    const SearchedBlogs = req.data.blogs.filter((blog) =>
      blog.title.toLowerCase().includes(title)
    );

    if (SearchedBlogs.length > 0) {
      return res.status(200).json(SearchedBlogs);
    } else {
      return res.status(404).json({ msg: "Not Found" });
    }
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = rout;
