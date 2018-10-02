const es = require("elasticsearch");

const client = new es.Client({
  host: "127.0.0.1:9200",
  log: "error"
});

module.exports = app => {
  app.post("/search/results", (req, res) => {
    console.log({ content: req.body.query });
    client
      .search({
        index: "se221",
        // index: "se221",
        //type: "_doc",
        size: 200,
        body: {
          query: {
            bool: {
              must: {
                match: {
                  content: {
                    query: req.body.query,
                    fuzziness: "auto"
                  }
                }
              },
              must_not: {
                regexp: {
                  link: ".*txt"
                }
              }
            }
            // match: {
            //   content: {
            //     query: req.body.query,
            //     fuzziness: "auto"
            //   }
            // }
            //match_all: {}
          },
          highlight: {
            fields: {
              content: {}
            },
            fragment_size: 300,
            pre_tags: ['<font color="red">'],
            post_tags: ["</font>"]
          }
        }
      })
      .then(results => res.send(results.hits), err => console.log(err.message));
  });
};
