<template>
    <div>
        <Loader v-if="loading" />
        <div class="release-note" v-for="note in notes" :key="note.id">
            <div class="date">
                <b>{{ formatDate(note.dateCreated) }}</b>
            </div>
            <p class="content">{{ note.note }}</p>
        </div>
    </div>
</template>

<script>
    import API from "../../services/InfoService";
    import dayjs from "dayjs";

    import Loader from "./parts/Loader";

    export default {
        name: "ReleaseNotes",
        components: {
            Loader
        },
        data() {
            return {
                loading: false
            };
        },
        methods: {
            getReleaseNotes() {
                this.loading = true;

                API.getReleaseNotes()
                    .then(response => {
                        if (response.data) {
                            this.releaseNotesData = response.data;
                        }
                        this.loading = false;
                    })
                    .catch(error => {
                        this.loading = false;
                    });
            },
            formatDate(date) {
                return dayjs(date).format("DD MMMM YYYY");
            }
        },
        mounted() {
            if (!this.notes.length) {
                this.getReleaseNotes();
            }
        },
        computed: {
            notes() {
                return this.$store.state.information.releaseNotes.data;
            }
        }
    };
</script>

<style lang="scss">
    .release-note {
        &:not(:last-of-type)

    {
        padding-bottom: 1rem;
        border-bottom: 1px solid #e5e5e5;
    }

    &:not(:first-of-type) {
        padding-top: 1rem;
    }

    .content {
        padding-left: 1rem;
        margin-top: 0.5rem;
        margin-bottom: 0;
    }
    }
</style>