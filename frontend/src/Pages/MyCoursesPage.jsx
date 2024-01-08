import { Card } from "antd"
const { Meta } = Card

const courses = require("../sampleData/courseData.json")

const MyCoursesPage = () => {
  console.log(courses);
  return (
    <div>
      <div className='flex items-center my-4'>
        <h1 className='text-3xl font-bold'>My Courses</h1>
      </div>
      <div className='flex flex-wrap gap-4 my-4'>
        {courses.map((course, index) => (
          <Card
            hoverable
            title={course.courseTitle}
            key={index}
            style={{ width: 300 }}>
            <div className='flex justify-between items-start'>
              <Meta
                title={course.teacher}
                description={course.courseCode}
              />
              <p className=' text-black opacity-70'>
                Cr. Hrs: {course.creditHour}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
export default MyCoursesPage