<template>
  <v-card class="pa-4 mt-4">
    <v-card-title style="background-color: pink; color: white;">
      รายชื่อนักเรียน
      <v-spacer></v-spacer>
      <v-text-field
        style="background-color: palevioletred; color: white;"
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="allStudents"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "ChildStudentComponent",

  props: {
    students: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    
    return {
      search: '',
      headers: [
        { text: 'ห้อง', value: 'studentClass' },
        { text: 'ลำดับ', value: 'number' },
        { text: 'ชื่อ', value: 'name' },
        { text: 'คะแนน', value: 'score' }
      ]
    }
  },

  computed: {
    allStudents() {
      return this.students.flatMap(cls =>
        cls.data.map(student => ({
          studentClass: cls.class,
          number: student.number,
          name: student.name,
          score: student.score
        }))
      )
    }
  }
}
</script>
