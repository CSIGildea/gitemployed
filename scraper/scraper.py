from github import Github
import credentials


# Takes username,password and token and tries to give back an authenticated github account
# With whichever of those details are correct

def auth_github_account(username,password,token):
    git_user_and_pass_ac = auth_user_password_login(username,password)
    git_token_ac = auth_token_login(token)
    if(git_user_and_pass_ac==None and git_token_ac == None):
        print("Invalid Credentials, please enter your credentials into credentials.py to run")
        return None
    else:
        if(git_user_and_pass_ac!=None): 
            return git_user_and_pass_ac
        if(git_token_ac!=None):
            return git_token_ac

        
# Takes github username and password and tries to authenticate it

def auth_user_password_login(username,password):
    try:
        git_account = Github(username,password)
        git_account.get_user().name
        return git_account
    except Exception as e:
        return None


# Takes github token and tries to authenticate it

def auth_token_login(token):
    try:
        git_account = Github(token)
        git_account.get_user().name
        return git_account
    except Exception as e:
        return None

def main():
    username = credentials.github_login['username']
    password = credentials.github_login['password']
    personal_access_token = credentials.github_login['personal_access_token']

    git_ac = auth_github_account(username,password,personal_access_token)

    if(git_ac!=None):
        user = git_ac.get_user("torvalds")
        for repo in user.get_repos():
            print(repo.name)

if __name__ == "__main__":
    main()
