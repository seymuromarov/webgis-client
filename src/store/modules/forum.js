const state = {
    issueList: {
        open: [],
        closed: [],
    },

    issueCount: {
        open: null,
        closed: null
    },
    activeTab: 1,
    activeCategoryId: 0,
    openIssue: null,
    categories: []
}

const mutations = {
    SET_OPEN_ISSUES(state, payload) {
        state.issueList = { ...state.issueList, open: payload }
    },
    SET_CLOSED_ISSUES(state, payload) {
        state.issueList = { ...state.issueList, closed: payload }
    },
    SET_ISSUE_COUNT(state, payload) {
        state.issueCount = payload
    },
    SET_OPEN_ISSUE(state, payload) {
        state.openIssue = payload
    },
    SET_CATEGORIES(state, payload) {
        state.categories = payload
    },
    SET_ACTIVE_TAB(state, payload) {
        state.activeTab = payload
    },
    SET_ACTIVE_CATEGORY_ID(state, payload) {
        state.activeCategoryId = payload
    }
}

const actions = {

}

export default {
    state,
    mutations
}