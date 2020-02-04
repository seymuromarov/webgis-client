<template>
    <div>
        <transition name="collapse">
            <div
                v-if="messageSent"
                class="alert alert-success"
                role="alert"
            >Your message has been sent</div>
        </transition>
        <form class="contact-block">
            <div class="form-group">
                <label for="subject">Subject</label>
                <input
                    type="text"
                    class="form-control"
                    :class="{'is-invalid': subjectIsInvalid}"
                    id="subject"
                    placeholder="Subject"
                    required
                    v-model="subject"
                />
            </div>
            <div class="form-group">
                <label for="content">Content</label>
                <textarea
                    class="form-control"
                    :class="{'is-invalid': messageIsInvalid}"
                    id="content"
                    rows="3"
                    placeholder="Content"
                    required
                    v-model="message"
                ></textarea>
            </div>
            <button
                type="submit"
                class="btn btn-primary submit-btn"
                @click.prevent="sendMessage"
                :disabled="loading"
            >Submit</button>
        </form>
    </div>
</template>

<script>
import API from "../../services/InfoService";

export default {
    name: "Contact",
    data() {
        return {
            subject: null,
            message: null,
            loading: false,
            messageSent: false
        };
    },
    methods: {
        sendMessage() {
            this.loading = true;

            const body = {
                subject: this.subject.trim(),
                message: this.message.trim()
            };

            API.sendMessage(body)
                .then(response => {
                    if (response.status === 200) {
                        this.subject = null;
                        this.message = null;
                        this.messageSent = true;
                        setTimeout(() => {
                            this.messageSent = false;
                        }, 5000);
                    }
                    this.loading = false;
                })
                .catch(error => {
                    this.loading = false;
                });
        }
    },
    computed: {
        subjectIsInvalid() {
            if (this.subject !== null) {
                return this.subject.trim() === "";
            }
            return false;
        },
        messageIsInvalid() {
            if (this.message !== null) {
                return this.message.trim() === "";
            }
            return false;
        }
    }
};
</script>

<style lang="scss">
.contact-block {
    padding: 1rem 4rem 2rem;
}
.submit-btn {
    width: 100%;
}

.collapse-body {
    opacity: 1;
    overflow: auto;
}

.collapse-enter-active,
.collapse-leave-active {
    transition: all 0.5s ease-in-out;
    transition-delay: 0s;
}
.collapse-enter,
.collapse-leave-to {
    opacity: 0;
}
</style>