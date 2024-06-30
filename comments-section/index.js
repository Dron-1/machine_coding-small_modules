// good-practice - DOMContentLoaded event is used 
// so that operation will take place 
// only after all dom elements have been loaded
document.addEventListener('DOMContentLoaded',   function() {
    const commentInput = document.getElementById('comment-input');
    const commentBtn = document.getElementById('submit-comment');
    const commentsContainer = document.querySelector('.comments-container')

    commentBtn.addEventListener('click', function(e){
        const commentValue = commentInput.value;
        addComment( commentValue )
        commentInput.value = '';        
    })

    // || This event function is example of event delegation  ||
    // || event listener on parent, but we are working only if certain child is clicked ||
    commentsContainer.addEventListener('click', function(e) {
        console.log("hello")
        if( e.target.classList.contains('reply-btn') ) {
            const parentComment = e.target.parentElement;
            const replyInput = parentComment.querySelector('.reply-input')
            replyInput.style.display='inline'

            const submitReplyBtn = parentComment.querySelector('.submit-reply') 
            submitReplyBtn.style.display='inline'
        }
        if( e.target.className.includes('submit-reply')) {
            const parentComment = e.target.parentElement;
            const replyInput = parentComment.querySelector('.reply-input')
        
            if(replyInput.value != "") {
                addReply(replyInput.value, parentComment);
            }
            replyInput.value="";
            replyInput.style.display = 'none';
            e.target.style.display='none';
        }
    })

    // functions
    function addComment(commentText) {
        const commentEle = document.createElement('div')
        commentEle.className = 'commentElement';
        commentEle.innerHTML=`
        <p class="comment-text">${commentText}</p>
        <p class="reply-btn">Reply</p>
        <textarea class="reply-input" placeholder="Write your reply here..."></textarea>
        <span class="submit-reply">&#x27A2;</span>
        `
        commentsContainer.appendChild(commentEle)
    }

    function addReply(replyText, parentComment ) {
        const replyContainer = document.createElement('div')
        replyContainer.className = 'replies-container'

        replyContainer.innerHTML = `
            <p class="reply-text">${replyText}</p>
            <p class="reply-btn">Reply</p>
            <textarea class="reply-input" placeholder="Write your reply here..."></textarea>
            <span class="submit-reply">&#x27A2;</span>
        `
        // <!-- on-reply -recursion implemented-->
        // || Added textare and spam tags to complete recursion replies ||
        // <!-- on-reply -recursion implemented-->

        parentComment.appendChild(replyContainer)
    }
})
