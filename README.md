**Run app**

```bash
cd backend

# Install requirements
brew install pipenv
pipenv sync

# Launch server
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver
```
