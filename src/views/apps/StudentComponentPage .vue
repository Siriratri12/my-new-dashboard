<template>
    <v-container>
        <v-card class="pa-4">
            <h2>นี่คือ Parent Component</h2>

            <!-- ข้อความส่งไป Child -->
            <v-text-field v-model="parentMessage" label="ข้อความที่จะส่งไป Child"></v-text-field>

            <!-- Child Student Component แสดงรายชื่อนักเรียน -->
            <child-student-component :students="students" />

        </v-card>
    </v-container>
</template>

<script>
import ChildStudentComponent from '@/components/app/example/ChildStudentComponent.vue'
import { students } from '@/data/students.js'

export default {
    name: "ParentComponent",

    components: {
        ChildStudentComponent,
    },

    data() {
        return {
            parentMessage: "",
            childMessage: "",
            students,
        };
    },

    methods: {
        getChildMessage(data) {
            this.childMessage = data
        },
    }
}
</script>
