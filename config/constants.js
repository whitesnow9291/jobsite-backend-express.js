module.exports = {
  'base_url': 'localhost:3000/',
  'secret':'nodeauthsecret',
  'frommail': 'eduardlebedenko80@gmail.com',
  'mailgun': {
    'api_key' : 'key-0e4228878343f000e39d52fff01ff844',
    'DOMAIN' : 'sandboxb6dc863d91b44d9eb9d2fc5802a0c365.mailgun.org'
  },
  'twilio': {
    'accountSid': 'AC14d0d32ed6c82130acc0140118f445af',
    'authToken': '1c16b2c6684735a6e57935f8c93115f4',
    
    // A Twilio number you control - choose one from:
    // https://www.twilio.com/user/account/phone-numbers/incoming
    // Specify in E.164 format, e.g. "+16519998877"
    'twilioNumber': '+13472066278',
    
    // Your Authy production key - this can be found on the dashboard for your
    // Authy application
    'authyKey': 'gqCDyQhbxrdOKVus0G120RSkOprWUMsy',
  },
  'role_type': {
    'restaurant_manager': 'restaurant_manager',
    'super_visior': 'super_visior'
  },
  'main_menus': ['breakfast', 'brunch', 'lunch', 'daily specials', 'drink', 'desert', 'dog'],
  'pusher': {
    'appId': '487456',
    'key': '760d4bd616622b123992',
    'secret': 'c50acab890efb39b399a',
    'cluster': 'us2'
  },
  'status': {
    'approved': 'approved',
    'notapproved': 'notapproved'
  },
  'errors': {
    'invalid_params': {
      'status': 'invalid_params',
      'message': 'Invalid parameter posted'
    },
    'server_error': {
      'status': 'server_error',
      'message': 'There are errors in server'
    },
    'user': {
      'not_found': {
        'status': 'not_found',
        'message': 'There is no such user'
      },
      'duplicated_email': {
        'status': 'duplicated_email',
        'message': 'Duplicated email exist'
      },
      'auth_fail': {
        'status': 'not_found',
        'message': 'Wrong email or password'
      },
      'authorization_error': {
        'status': 'not_authorized',
        'message': 'You have not right to access'
      },
      'not_approved': {
        'status': 'not_approved',
        'message': 'Your account is not approved yet.'
      },
      'verify_failed': {
        'status': 'incorrect_verification',
        'message': 'Verification Info is incorrect'
      }
    }
  }
};
