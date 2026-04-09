<template>
    <div>
        <h2>{{ title }}</h2>

        <p>ชื่อผู้ใช้: {{ username }}</p>
        <p>อายุปีหน้า: {{ nextAge }}</p>

        <button @click="increaseAge">เพิ่มอายุ</button>

        <h1>Parent Component</h1>

        <ChildExComponent message="สวัสดีจาก Parent" />
    </div>
</template>

<script>
import ChildExComponent from '@/components/app/example/ChildExComponent.vue';

export default {
    /* 1) props */
    props: {
        username: {
            type: String,
            required: true
        }
    },

    /* 2) data */
    data() {
        return {
            title: 'ตัวอย่าง Vue Component',
            age: 20
        }
    },

    /* 3) components */
    components: {
        ChildExComponent
    },

    /* 4) mounted */
    mounted() {
        console.log('Component ถูกโหลดแล้ว')
        console.log('อายุเริ่มต้น:', this.age)
    },

    /* 5) methods */
    methods: {
        increaseAge() {
            this.age++
        }
    },

    /* 6) computed */
    computed: {
        nextAge() {
            return this.age + 1
        }
    }
}
</script>
