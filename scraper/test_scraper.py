import scraper

def test_auth_github_account_invalid_user_and_pass():
    github_ac = scraper.auth_github_account("hackerboi3000","123password","")
    assert github_ac == None

def test_auth_github_account_invalid_token():     # Not real token
    github_ac = scraper.auth_github_account("","","3HnjKB1TnQSiYG3uaTMWD33UF2ZxoSPTP5")
    assert github_ac == None

def test_auth_user_password_login_invalid():
    github_ac = scraper.auth_user_password_login("hackerboi3000","123password")
    assert github_ac == None

def test_auth_token_login_invalid():
    github_ac = scraper.auth_token_login("3HnjKB1TnQSiYG3uaTMWD33UF2ZxoSPTP5")
    assert github_ac == None
