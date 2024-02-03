import { request, gql } from "graphql-request";

const MASTER_URL =
  "https://api-ap-southeast-2.hygraph.com/v2/cls51ryrg000008l6hkrk05bu/master";
// const MASTER_URL =
//   "https://api-ap-southeast-2.hygraph.com/v2/clr9wjxb90wqo01wdk0e46ocq/master";

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
              html
            }
            output {
              markdown
              html
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
export const markChapterCompleted = async (
  chapterId,
  recordId,
  userEmail,
  points
) => {
  const Query =
    gql`
    mutation markChapterCompleted {
      updateUserEnrolledCourse(
        data: { completedChapter: { create: { data: { chapterId: "` +
    chapterId +
    `" } } } }
        where: { id: "` +
    recordId +
    `" }
      ) {
        id
      }
      publishManyUserEnrolledCoursesConnection {
        edges {
          node {
            id
          }
        }
      }
      updateUserDetail(where:{email:"` +
    userEmail +
    `"},
      data:{point:` +
    points +
    `}){
      point
    }
    publishUserDetail(where:{email:"` +
    userEmail +
    `"}){
      id
    }
    }
  `;
  const result = await request(MASTER_URL, Query);

  return result;
};

export const CreateNewUser = async (userName, email, profileImageUrl) => {
  const mutationQuery =
    gql`
    mutation CreateUserUser {
      upsertUserDetail(
        upsert: {
          create: {
            email: "` +
    email +
    `"
            
            profileImage: "` +
    profileImageUrl +
    `"
            userName: "` +
    userName +
    `"
          }
          update: { email: "` +
    email +
    `" }
        }
        where: { email: "` +
    email +
    `" }
      ) {
        id
      }
      publishUserDetail(where: { email: "` +
    email +
    `" }) {
        id
      }
    }
  `;
  const result = await request(MASTER_URL, mutationQuery);

  return result;
};

export const GetUserDetail = async (email) => {
  const query =
    gql`
  query getUserDetails {
    userDetail(where: {email: "` +
    email +
    `"}) {
      point
    }
  }
  `;
  const result = await request(MASTER_URL, query);

  return result;
};

export const GetGradePoints = async (email) => {
  const _gradequery = gql`
    query GetGradePoints {
      gradePoints(orderBy: minPoint_DESC) {
        id
        profileImage
        icon {
          url
        }
        name
        minPoint
      }
    }
  `;
  const result = await request(MASTER_URL, _gradequery);

  return result;
};

export const GetAllProgressCourse = async (email) => {
  const query =
    gql`
    query GetAllUserEnrolledProgressCourse {
      userEnrolledCourses(where: { userEmail: "` +
    email +
    `" }) {
        completedChapter {
          chapterId
        }
        course {
          banner {
            url
          }
          icon {
            url
          }
          chapters {
            id
            title
            chapterContent {
              heading
              description {
                markdown
                html
              }
              output {
                markdown
                html
              }
            }
          }
          description {
            markdown
          }
          id
          level
          name
          price
          time
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);

  return result;
};
