$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html = `<div class="message-list__message-contents">
                    <div class="message-list__message-contents__user-name">
                      ${message.user_name}
                    </div>
                    <div class="message-list__message-contents__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="message-list__message-box">
                    <p class="message-box__messege">
                      ${message.content}
                    </p>
                    <img class="image" src="${message.image}">
                  </div>`
    return html;
  } else {
    let html = `<div class="message-list__message-contents">
                  <div class="message-list__message-contents__user-name">
                    ${message.user_name}
                  </div>
                  <div class="message-list__message-contents__date">
                    ${message.created_at}
                  </div>
                </div>
                <div class="message-list__message-box">
                  <p class="message-box__messege">
                    ${message.content}
                  </p>
                </div>`
    return html;
    };
  } 

  $('.message-form__box').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.message-list').append(html);
      $('form')[0].reset();
      $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
      $('.message-form__box__send-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
  });
});