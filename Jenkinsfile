// CI/CD pipeline for Crave Club.
// Create it in Jenkins as a Multibranch Pipeline pointing at this GitHub repository.
// Every branch and pull request is checked and built; only main is deployed.
pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
    timeout(time: 30, unit: 'MINUTES')
    buildDiscarder(logRotator(numToKeepStr: '20'))
  }

  stages {
    stage('Checks') {
      parallel {
        stage('Frontend lint and build') {
          steps {
            dir('FrontEnd') {
              sh 'npm ci'
              sh 'npm run lint'
              sh 'npm run build'
            }
          }
        }
        stage('Backend install and syntax check') {
          steps {
            dir('BackEnd') {
              sh 'npm ci --omit=dev'
              sh "find . -name '*.js' -not -path './node_modules/*' -print0 | xargs -0 -n1 node --check"
            }
          }
        }
      }
    }

    stage('Docker images build') {
      environment {
        // Placeholders: compose requires them, but nothing connects to a database here.
        JWT_SECRET = 'ci-placeholder-secret'
        MONGO_URI = 'mongodb://ci-placeholder:27017/food-delivery'
      }
      steps {
        // A separate project name keeps CI images apart from the running app.
        sh 'docker compose -p food-delivery-ci build'
      }
    }

    stage('Deploy') {
      when { branch 'main' }
      steps {
        // Secret text credentials added in Jenkins: mongo-uri and jwt-secret.
        withCredentials([
          string(credentialsId: 'mongo-uri', variable: 'MONGO_URI'),
          string(credentialsId: 'jwt-secret', variable: 'JWT_SECRET'),
        ]) {
          sh 'docker compose -p food-delivery-system up -d --build --remove-orphans'
          sh 'docker compose -p food-delivery-system ps'
        }
      }
    }
  }

  post {
    success { echo "Pipeline passed for ${env.BRANCH_NAME ?: 'this build'}" }
    failure { echo 'Pipeline failed. Open the failed stage above to see why.' }
    always { cleanWs() }
  }
}
