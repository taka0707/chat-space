$(function(){
    function buildHTML(message){
      if ( message.image ) {
        let html = `<div class="message-list__message-contents" data-message-id=${message.id}>
                      <div class="message-list__message-contents__user-name">
                        ${message.user_name}
                      </div>
                      <div class="message-list__message-contents__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="message-list__message-box">
                      <p class="message-box__message">
                        ${message.content}
                      </p>
                      <img class="image" src="${message.image}">
                    </div>`
      return html;
      } else {
      let html = `<div class="message-list__message-contents" data-message-id=${message.id}>
                    <div class="message-list__message-contents__user-name">
                      ${message.user_name}
                    </div>
                    <div class="message-list__message-contents__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="message-list__message-box">
                    <p class="message-box__message">
                      ${message.content}
                    </p>
                  </div>`
      return html;
    };
  } 

  let reloadMessages = function() {
    let last_message_id = $('.message-list__message-contents:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log(messages)
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.message-list').append(insertHTML);
        $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});