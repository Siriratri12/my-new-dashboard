1////////////////////////////
<template>
      <v-card class="pa-4" flat>
        <v-toolbar flat color="transparent">
            <v-toolbar-title class="headline primary--text">
                <v-icon color="primary" class="mr-2">mdi-delete-clock</v-icon>
                Order Deletetion Histore
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <!-- <v-btn v-if="deletedOrders.length > 0" color="red darken-2" dark outlined small
                @click="clearDeletedHistory">
                <v-icon left small>mdi-trash-can-outline</v-icon>
                Delete All
            </v-btn> -->

            <v-btn v-if="deletedOrders.length > 0" color="red darken-2" dark outlined small
                @click="clearDeletedHistory">
                <v-icon left small>mdi-trash-can-outline</v-icon>
                Delete All
            </v-btn>
        </v-toolbar>

        <v-data-table :headers="headers" :items="deletedOrders" dense class="elevation-1">
            <template #[`item.deletedAt`]="{ item }">
                {{ new Date(item.deletedAt).toLocaleString() }}
            </template>

            <template #[`item.action`]="{ item }">
                <v-btn icon color="success" @click="restoreOrder(item.id)" class="mr-1">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon v-bind="attrs" v-on="on" small>mdi-restore</v-icon>
                        </template>
                        <v-list-item-title>Recover</v-list-item-title>
                    </v-tooltip>
                </v-btn>

                <v-btn icon color="red lighten-1" @click="removePermanent(item.id)">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon v-bind="attrs" v-on="on" small>mdi-close-circle-outline</v-icon>
                        </template>
                        <v-list-item-title>Permanently Delete</v-list-item-title>
                    </v-tooltip>
                </v-btn>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useOrderStore } from '@/stores/orderStore'

export default {
    data: () => ({
        headers: [
            { text: 'Order No.', value: 'id' },
            { text: 'Product', value: 'productName' },
            { text: 'Qty', value: 'qty', align: 'center' },
            { text: 'Deleted At', value: 'deletedAt' },
            { text: 'Action', value: 'action', sortable: false, align: 'center' }
        ]
    }),
    computed: {
        ...mapState(useOrderStore, ['deletedOrders'])
    },
    methods: {
        ...mapActions(useOrderStore, ['restoreOrder', 'clearDeletedHistory', 'removePermanent'])
    }
}
</script>