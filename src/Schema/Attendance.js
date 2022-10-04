import { gql } from "@apollo/client"

export const CREATE_ATTENDANCE = gql`
mutation CreateAttendance($fingerprintAtt: [FingerprintAtt]!, $microsoftTeamAtt: [MicrosoftTeamAtt]!) {
  createAttendance(fingerprintAtt: $fingerprintAtt, microsoftTeamAtt: $microsoftTeamAtt) {
    status
    message
  }
}
`
export const GET_ATTENDANCE_WITH_PAGINATION = gql`
query GetAttendanceBypagination($page: Int, $limit: Int, $keyword: String, $pagination: Boolean) {
  getAttendanceBypagination(page: $page, limit: $limit, keyword: $keyword, pagination: $pagination) {
    Attendances {
      emp_id
      image
      employee_Name {
        _id
        national_Id
        employee_Id
        khmer_Name {
          first_Name
          last_Name
        }
        latin_Name {
          first_Name
          last_Name
        }
        gender
        image
      }
      department
      attendance
      late_as_minutes
      reason
      fine
      attendance_Date
    }
    paginator {
      slNo
      prev
      next
      perPage
      totalPosts
      totalPages
      currentPage
      hasPrevPage
      hasNextPage
      totalDocs
    }
  }
}
`

export const REMOVE_ATTENDANCE = gql`
mutation RemoveAttendanceByDay($day: Date) {
  removeAttendanceByDay(day: $day) {
    status
    message
  }
}
`

export const GET_ATTENDANCE_BY_DAY = gql`
query GetAttendanceByDay($date: Date) {
  getAttendanceByDay(date: $date) {
    employee_id {
      _id
      national_id
      employee_id
      khmer_name {
        first_name
        last_name
      }
      latin_name {
        first_name
        last_name
      }
      gender
      image
      date_of_birth
      place_of_birth
      nationality
      position
      shift
      join_date
      phone
      email
      department {
        key
        affair_name
        office_name
        section_name
        affair_id {
          _id
          name
          description
          image {
            src
            name
          }
          created_at
        }
        office_id {
          _id
          name
          affair_id
          description
          image {
            src
            name
          }
          created_at
        }
        section_id {
          _id
          name
          affair_id
          description
          image {
            src
            name
          }
          created_at
        }
      }
      insurance {
        key
        start_End_Date
        title
      }
      experience {
        start_end_date
        title
        company
        key
      }
      edu_background {
        start_end_date
        title
        school
        key
      }
      workingStatus
      contract {
        contract_type
        start_date
        end_date
        in_position
        salary
        public_holiday
        annual_leave
        using
        key
      }
      type
      marital
      work_book
      created_at
    }
  }
}
`