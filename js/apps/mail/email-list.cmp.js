import emailPreview from "./email-preview.cmp.js";

export default {
    props: ['emails'],
    template: `

    
    `,
    components: {
        emailPreview
    },
    methods: {
        remove(emailId) {
            this.$emit('remove', emailId);
        },
        select(email) {
            this.$emit('selected', email);
        },
    },
    // computed: {}
};