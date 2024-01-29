import { request, gql } from "graphql-request";

const MASTER_URL =
  "https://api-ap-southeast-2.hygraph.com/v2/clr9wjxb90wqo01wdk0e46ocq/master";

export const getCourseList = async (level) => {
  //level = "Basic";
  // console.log("level123", level.level);
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
        description {
          markdown
        }
        banner {
          url
        }
        chapters {
          title
          id
          chapterContent {
            heading
            description {
              markdown
            }
            output {
              markdown
            }
          }
          
        }
      }
    }
  `;

  const result = await request(MASTER_URL, query);

  return result;
};

export const enrollCourse = async (courseId, userEmail) => {
  //console.log("courseId", courseId);
  //console.log("userEmail", userEmail);
  const mutationQuery =
    gql`
    mutation MyMutation {
      createUserEnrolledCourse(
        data: {
          courseId: "` +
    courseId +
    `"
          userEmail: "` +
    userEmail +
    `"
          course: { connect: { id: "` +
    courseId +
    `" } }
        }
      ) {
        id
      }
      publishManyUserEnrolledCoursesConnection(to: PUBLISHED) {
        edges {
          node {
            id
          }
        }
      }
    }
  `;
  const result = await request(MASTER_URL, mutationQuery);

  return result;
};

export const getUserEnrolledCourse = async (courseId, userEmail) => {
  //console.log("courseId", courseId);
  //console.log("userEmail", userEmail);
  const userEnrolledCourseQuery =
    gql`
    query GetUserEnrolledCourse {
      userEnrolledCourses(
        where: {
          courseId: "` +
    courseId +
    `"
          userEmail: "` +
    userEmail +
    `"
        }
      ) {
        id
        courseId
        completedChapter {
          chapterId
        }
      }
    }
  `;
  const result = await request(MASTER_URL, userEnrolledCourseQuery);

  return result;
};
