<template>
    <div>
        <!-- New Comment -->
        <div class="issue__comment new-comment">
            <div class="card">
                <h6 class="card-header">
                    <div>
                        <span class="issue__author">{{ title }}</span>
                    </div>
                </h6>
                <div class="card-body">
                    <quill-editor v-model="content" ref="newComment" :options="editorOption"></quill-editor>
                </div>
            </div>
            <button
                type="button"
                class="btn btn-primary submit-btn"
                :disabled="!content"
                @click="submitComment"
            >Submit</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "NewComment",
    props: {
        replyId: {
            type: Number
        }
    },
    data() {
        return {
            content: "",
            editorOption: {
                // modules: {
                //     toolbar: {
                //         container: "#toolbar", // Selector for toolbar container
                //         handlers: {
                //             bold: customBoldHandler
                //         }
                //     }
                // }
            }
        };
    },
    methods: {
        submitComment() {
            const data = {
                content: this.content,
                parentId: this.replyId
            };
            this.$emit("submitComment", data);
            this.content = "";
        }
    },
    computed: {
        title() {
            if (this.replyId) {
                return "New reply";
            } else {
                return "New comment";
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.new-comment {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
.submit-btn {
    margin-top: 1.6rem;
}
</style>