<template>
    <v-card class="pa-4 mb-6 shadow-sm" outlined>
        <v-row align="center">
            <v-col cols="12" md="4">
                <v-combobox v-model="filters.search" :items="searchItems" :label="searchLabel"
                    :search-input.sync="typingText" prepend-inner-icon="mdi-magnify" outlined dense hide-details
                    clearable @change="emitChange"></v-combobox>
            </v-col>

                <!-- <v-col cols="12" md="4">
                    <v-autocomplete v-model="filters.search" :items="searchItems" :label="searchLabel"
                        :search-input.sync="typingText" prepend-inner-icon="mdi-magnify" outlined dense hide-details
                        clearable @change="emitChange"></v-autocomplete>
                </v-col> -->

            <v-col v-if="categories" cols="12" md="4">
                <v-select v-model="filters.category" :items="categories" label="Category"
                    prepend-inner-icon="mdi-shape-p lus-outline" outlined dense hide-details clearable
                    @change="emitChange" />
            </v-col>

            <v-col v-if="showStatus" cols="12" md="4">
                <v-select v-model="filters.status" :items="['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled']"
                    label="Status" prepend-inner-icon="mdi-list-status" outlined dense hide-details
                    @change="emitChange" />
            </v-col>

            <v-col cols="12" md="4">
                <v-menu v-model="menu" :close-on-content-click="false" offset-y min-width="290px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field :value="dateRangeText" label="Date Range" prepend-inner-icon="mdi-calendar"
                            readonly outlined dense hide-details v-bind="attrs" v-on="on" clearable
                            @click:clear="clearDates" />
                    </template>
                    <v-date-picker v-model="filters.dates" range no-title @input="handleDateInput" />
                </v-menu>
            </v-col>
        </v-row>

        <v-divider class="my-4"></v-divider>

        <v-row>
            <v-col cols="4">
                <div class="pa-2 text-center light-blue lighten-5 rounded-lg border shadow-sm">
                    <div class="caption grey--text font-weight-bold">SEARCH RESULT</div>
                    <strong class="primary--text text-truncate d-block">{{ filters.search || '-' }}</strong>
                </div>
            </v-col>
            <v-col cols="4">
                <div class="pa-2 text-center green lighten-5 rounded-lg border shadow-sm">
                    <div class="caption grey--text font-weight-bold">
                        {{ categories ? 'CATEGORY' : 'ORDER STATUS' }}
                    </div>
                    <strong class="green--text text--darken-3">
                        {{ categories ? (filters.category || 'All') : filters.status }}
                    </strong>
                </div>
            </v-col>
            <v-col cols="4">
                <div class="pa-2 text-center amber lighten-5 rounded-lg border shadow-sm">
                    <div class="caption grey--text font-weight-bold">SELECTED PERIOD</div>
                    <strong class="amber--text text--darken-4">{{ dateRangeText || '-' }}</strong>
                </div>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
export default {
    name: 'FilterPanel',
    props: {
        searchLabel: { type: String, default: 'Search...' },
        searchItems: { type: Array, default: () => [] },
        categories: { type: Array, default: null },
        showStatus: { type: Boolean, default: false }
    },
    data: () => ({
        menu: false,
        typingText: '',
        filters: {
            search: '',
            category: null,
            status: 'All',
            dates: []
        }
    }),
    watch: {
        typingText(val) {
            if (val !== this.filters.search) {
                this.filters.search = val || '';
                this.emitChange();
            }
        }
    },
    computed: {
        dateRangeText() {
            if (!this.filters.dates || this.filters.dates.length !== 2) return '';
            return [...this.filters.dates].sort().join(' - ');
        }
    },
    methods: {
        handleDateInput() {
            if (this.filters.dates.length === 2) {
                this.menu = false;
                this.emitChange();
            }
        },
        clearDates() {
            this.filters.dates = [];
            this.emitChange();
        },
        emitChange() {
            this.$emit('filter-change', { ...this.filters });
        }
    }
}
</script>