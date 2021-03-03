<template>
  <div>
    <Loader v-if="loading" />
    <div class="accordion">
      <!-- Accordion item -->
      <div class="card" v-for="question in questions" :key="question.id">
        <div class="card-header">
          <h5 class="mb-0">
            <button
              class="btn btn-link"
              :class="{ collapsed: activeQuestionIds !== question.id }"
              @click="toggleAccordion(question.id)"
            >
              {{ question.question }}
            </button>
          </h5>
        </div>

        <transition name="collapse" delay="0">
          <div
            v-show="activeQuestionIds.includes(question.id)"
            class="collapse-body"
          >
            <div class="card-body">{{ question.answer }}</div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import faq from "@/api/faq";

export default {
  name: "FAQ",

  data() {
    return {
      activeQuestionIds: [],
      questions: [],
      loading: false,
    };
  },
  methods: {
    getFaqs() {
      this.loading = true;

      faq
        .getAll()
        .then((response) => {
          this.questions = response;
        })
        .catch((error) => {})
        .finally(() => {
          this.loading = false;
        });
    },
    toggleAccordion(id) {
      if (this.activeQuestionIds.includes(id)) {
        const index = this.activeQuestionIds.findIndex((x) => x === id);
        this.activeQuestionIds.splice(index, 1);
      } else {
        this.activeQuestionIds.push(id);
      }
    },
    labelClick(e) {
      if (e.target.checked === true) {
        document.querySelectorAll(".toggle").forEach((item) => {
          if (
            item.getAttribute("data-index") !==
            e.target.getAttribute("data-index")
          ) {
            item.checked = false;
          }
        });
      }
    },
  },
  mounted() {
    if (!this.questions.length) {
      this.getFaqs();
    }
  },
};
</script>

<style lang="scss">
.accordion {
  .card-header {
    padding: 0;
    .btn-link {
      color: #5a5a5a;
      padding: 0.5rem 0.75rem;
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
