

export default {
    props: ["note"],
    template: `
    <section class="note-preview">
        <p><span>Note:</span> {{note.info.txt}}</p>
    
</section>
    `,
};