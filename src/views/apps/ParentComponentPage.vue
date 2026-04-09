<template>
    <v-container>
        <v-card class="pa-4">
            <h2>นี่คือ Parent Component</h2>

            <v-text-field v-model="parentMessage" label="ข้อความที่จะส่งไป Child"></v-text-field>

            <child-component :message="parentMessage" @child-send="getChildMessage" />

            <!-- <ChildCarComponent color="pink" wheelsColor="purple" carName="JIJI" @wheelStatus="handleWheelStatus"/>
            <div class="mt-4">
                <strong>Status:</strong> {{ status }}
            </div> -->

            <v-container>
                <child-car-component color="#ff5555" wheelsColor="#333333" carName="PSU Turbo"
                    @wheelStatus="handleWheelStatus" />

                <div class="mt-4">
                    <strong>Status:</strong> {{ status }}
                </div>
                <child-car-component color="pink" wheelsColor="purple" carName="Test"
                    />

                <!-- <div class="mt-4">
                    <strong>Status:</strong> {{ status }}
                </div> -->
            </v-container>

            <div class="mt-4">
                <strong>ข้อความที่รับจาก Child:</strong>
                <div>{{ childMessage }}</div>
            </div>
        </v-card>
    </v-container>
</template>

<script>
import ChildComponent from '@/components/app/example/ChildComponent.vue'
import ChildCarComponent from '@/components/app/example/ChildCarComponent.vue'

export default {
    name: "ParentComponent",

    components: {
        ChildComponent,
        ChildCarComponent,
    },

    data() {
        return {
            parentMessage: "",
            childMessage: "",
            status: "stop", // ต้องประกาศเพื่อ reactive

            students: [
                // ห้อง ม.1/1
                {
                    class: "1/1",
                    data: [
                        { number: 1, name: "สมชาย", score: 85 },
                        { number: 2, name: "สมหญิง", score: 90 },
                        { number: 3, name: "สมปอง", score: 78 },
                        { number: 4, name: "สมใจ", score: 88 },
                        { number: 5, name: "สมรัตน์", score: 92 },
                        { number: 6, name: "สมฤดี", score: 80 },
                        { number: 7, name: "สมพร", score: 75 },
                        { number: 8, name: "สมชายาภา", score: 84 },
                        { number: 9, name: "สมฤทธิ์", score: 77 },
                        { number: 10, name: "สมเกียรติ", score: 89 },
                    ],
                },

                // ห้อง ม.1/2
                {
                    class: "1/2",
                    data: [
                        { number: 1, name: "นที", score: 82 },
                        { number: 2, name: "นทีพร", score: 91 },
                        { number: 3, name: "นทีชัย", score: 76 },
                        { number: 4, name: "นทีสุดา", score: 87 },
                        { number: 5, name: "นทีวรรณ", score: 93 },
                        { number: 6, name: "นทีวิภา", score: 79 },
                        { number: 7, name: "นทีโรจน์", score: 81 },
                        { number: 8, name: "นทีวดี", score: 85 },
                        { number: 9, name: "นทีเกียรติ", score: 78 },
                        { number: 10, name: "นทีสิน", score: 88 },
                    ],
                },

                // ห้อง ม.1/3
                {
                    class: "1/3",
                    data: [
                        { number: 1, name: "อรชา", score: 80 },
                        { number: 2, name: "อรพิน", score: 86 },
                        { number: 3, name: "อรพรรณ", score: 74 },
                        { number: 4, name: "อรณี", score: 88 },
                        { number: 5, name: "อรทัย", score: 91 },
                        { number: 6, name: "อรวิภา", score: 82 },
                        { number: 7, name: "อรอนงค์", score: 77 },
                        { number: 8, name: "อรอุษา", score: 85 },
                        { number: 9, name: "อรสิทธิ์", score: 79 },
                        { number: 10, name: "อรเกียรติ", score: 87 },
                    ],
                },
            ],
        };
    },

    methods: {
        getChildMessage(data) {
            this.childMessage = data
        },

        handleWheelStatus(val) {
            this.status = val; // รับค่า status จาก child
        }
    }
}
</script>
