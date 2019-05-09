$(document).ready(function() {
    $('#errContainer').hide();
    $('#apkmsg').hide();
});

$(document).on('click', '.triggerLogout', function() {
    $('#logoutForm').submit();
});

$('#frontLoginForm').submit(function() {
    $('#errContainer').hide();
    $('#loginBtn').attr('disabled', true);
    $('#loginBtn').html('Authenticating');
    var formData = $(this).serialize();
    $.post(loginUrl, formData, function(data) {
        $('#loginBtn').attr('disabled', false);
        $('#loginBtn').html('Login');
        if(data.status) {
            window.location.href = '';
        } else
        {
            $('#errContainer').hide().html('Provided login details are invalid.').fadeIn();
        }
    });
    return false;
});

$('#apkdownloader').submit(function() {
    $('#downloadContainer').hide();
    $('#apkDlBtn').hide().html('Downloading...').fadeIn();
    $('#apkDlBtn').attr('disabled', true);
    $('#apkmsg').hide();
    var formData = $(this).serialize();
    var postUrl = $(this).attr('action');
    $.post(postUrl, formData, function(data) {
        $('#apkDlBtn').hide().html('Download Another').fadeIn();
        $('#apkDlBtn').attr('disabled', false);
        if(data.dl) {
            $('#downloadContainer').show();
            $('#downloadLink').html('Download ready, <a href="'+data.dl+'">get your file here <span class="icon-download"></span></a><br>(Size: '+data.size+' Version: '+data.version+')');
        } else {
            $('#apkmsg').hide().html(data.err).fadeIn();
        }
    });
    return false; 
});

$('#signupForm').submit(function() {
    $('#formErrors').hide();
    $.ajax({
        method: 'POST',
        data: $(this).serialize(),
        url: $(this).attr('action'),
        success: function(data) {
            window.location = '';
        },
        error: function(data) {
            $('#formErrors').show();
            $('#formErrors').html('');
            obj = JSON.parse(data.responseText);
            for(err in obj.errors) {
                $('#formErrors').append('<div class="alert alert--error">'+obj.errors[err]+'</div>');
            }
        }
    });
    return false;
});

$(document).on('click', '.followuser', function() {
    var _this = $(this);
    var id = _this.data('id');
    var countit = _this.data('count');
    var action = _this.data('action');
    $.get(followUrl+'?id='+id+'&action='+action, function(data) {
        if(data.status) {
            if(action == 'follow') {
                _this.html('Following');
                _this.data('action', 'unfollow');
                if(countit) {
                    $('#fc-'+id).html(parseInt($('#fc-'+id).text()) + 1);
                }
            } else {
                _this.html('Follow');
                _this.data('action', 'follow');
                if(countit) {
                    $('#fc-'+id).html(parseInt($('#fc-'+id).text()) - 1);
                }
            }
        }
    });
});

$(document).on('click', '.favoriteit', function() {
    var _this = $(this);
    var id = _this.data('id');
    var action = _this.data('action');
    $.get(favoriteUrl+'?id='+id+'&action='+action, function(data) {
        if(data.status) {
            if(action == 'favorite') {
                _this.addClass('liked');
                _this.data('action', 'unfavorite');
            } else {
                _this.removeClass('liked');
                _this.data('action', 'favorite');
            }
        }
    });
});

$(document).on('click', '.removeit', function() {
    $('#fa-'+$(this).data('id')).fadeOut();
    window.location = '?tab=favorites';
});

$(document).on('click', '.submitform', function() {
    var form = $(this).closest('form');
    var postUrl = form.attr('action');
    $.post(postUrl, form.serialize(), function(data) {
        
    });
    return false;
});