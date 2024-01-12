import { request, gql } from "graphql-request";

const MASTER_URL =
  "https://api-ap-southeast-2.hygraph.com/v2/clr9wjxb90wqo01wdk0e46ocq/master";

export const getCourseList = async (level) => {
  //level = "Basic";
  console.log("level123", level.level);
  const query =
    gql`
    query CourseList {
      courses(where: { level: ` +
    level.level +
    ` }) {
        id
        name
        price
        level
        tags
        time
        author
        icon {
          url
        }
        banner {
          url
        }
        chapters {
          id
        }
      }
    }
  `;

  const result = await request(MASTER_URL, query);

  return result;
};
