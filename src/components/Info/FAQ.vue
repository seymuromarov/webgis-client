<template>
    <div>
        <Loader v-if="loading" />

        <!-- <div class="wrap-collabsible">
            <input
                id="collapsible"
                class="toggle"
                type="checkbox"
                @change="labelClick"
                data-index="0"
            />
            <label for="collapsible" class="lbl-toggle">More Info</label>
            <div class="collapsible-content">
                <div class="content-inner">
                    <p>
                        QUnit is by calling one of the object that are embedded in JavaScript, and faster JavaScript program could also used with
                        its elegant, well documented, and functional programming using JS, HTML pages Modernizr is a popular browsers without
                        plug-ins. Test-Driven Development.
                    </p>
                </div>
            </div>
        </div>
        <div class="wrap-collabsible">
            <input
                id="collapsible2"
                class="toggle"
                type="checkbox"
                @change="labelClick"
                data-index="1"
            />
            <label for="collapsible2" class="lbl-toggle">More Info</label>
            <div class="collapsible-content">
                <div class="content-inner">
                    <p>
                        QUnit is by calling one of the object that are embedded in JavaScript, and faster JavaScript program could also used with
                        its elegant, well documented, and functional programming using JS, HTML pages Modernizr is a popular browsers without
                        plug-ins. Test-Driven Development.
                    </p>
                </div>
            </div>
        </div>-->

        <div class="accordion">
            <!-- Accordion item -->
            <div class="card" v-for="question in questions" :key="question.id">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button
                            class="btn btn-link"
                            :class="{'collapsed': activeQuestionId !== question.id}"
                            @click="toggleAccordion(question.id)"
                        >{{ question.question }}</button>
                    </h5>
                </div>

                <transition name="collapse" delay="0">
                    <div v-show="question.id === activeQuestionId" class="collapse-body">
                        <div class="card-body">{{ question.answer }}</div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import API from "../../services/InfoService";
import Loader from "./parts/Loader";

export default {
    name: "FAQ",
    components: {
        Loader
    },
    data() {
        return {
            activeQuestionId: null,
            questions: [],
            loading: false
        };
    },
    methods: {
        getFAQ() {
            API.getFAQ()
                .then(response => {
                    if (response.data) {
                        this.questions = response.data;
                    }
                    this.loading = false;
                })
                .catch(error => {
                    console.log(error);
                    this.loading = false;
                });
        },
        toggleAccordion(id) {
            if (this.activeQuestionId === id) {
                this.activeQuestionId = null;
            } else {
                this.activeQuestionId = id;
            }
        },
        labelClick(e) {
            console.log(e.target.checked);

            if (e.target.checked === true) {
                document.querySelectorAll(".toggle").forEach(item => {
                    if (
                        item.getAttribute("data-index") !==
                        e.target.getAttribute("data-index")
                    ) {
                        item.checked = false;
                    }
                });
            }
        }
    },
    mounted() {
        this.loading = true;
        this.getFAQ();
    }
};
</script>

<style lang="scss">
.accordion {
    .card-header {
        padding: 0;
        .btn-link {
            color: #5a5a5a;
            padding: 8px 12px;
        }
    }

    .collapse-body {
        max-height: 30vh;
        overflow: auto;
    }

    .collapse-enter-active,
    .collapse-leave-active {
        transition: max-height 0.5s ease-in-out;
        transition-delay: 0s;
    }
    .collapse-enter,
    .collapse-leave-to {
        max-height: 0;
    }
}
</style>