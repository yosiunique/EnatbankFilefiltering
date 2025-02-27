pipeline{
     options {
        buildDiscarder(logRotator(numToKeepStr: '2'))
    }

    environment{
    DATE=new Date().format('yy.M')
    TAG = "${DATE}.${BUILD_NUMBER}"

}

agent any
stages{

     stage("Build Docker for Development"){
         when{
             branch "develop"
         }
        steps{
           script{
               docker.build("10.1.12.73:5000/kyc-file-filter-front-end:${TAG}","--build-arg config=staging .")
           }
        }
    }


  

      stage("Build Docker for Production"){
         when{
             branch "main"
         }
        steps{
           script{
               docker.build("10.1.12.73:5000/kyc-file-filter-front-end:${TAG}","--build-arg config=production .")
           }
        }
    }
    stage("Push Docker Image to Local Registry"){
        steps{
           script{
               docker.withRegistry("http://10.1.12.73:5000"){
                   docker.image("10.1.12.73:5000/kyc-file-filter-front-end:${TAG}").push()
                   docker.image("10.1.12.73:5000/kyc-file-filter-front-end:${TAG}").push("latest")
               }
           }
        }
    }

    stage("Deliver for development"){
        when{
            branch "develop"
        }
                 steps{
                    sshagent(['ebdev']) {
                    sh 'ssh -o StrictHostKeyChecking=no -l  ebdevuat 10.1.22.72      "docker stop kyc-file-filter-web-app | true;     docker rm kyc-file-filter-web-app | true;     docker run -p 5004:80  -d --name kyc-file-filter-web-app 10.1.12.73:5000/kyc-file-filter-front-end:${TAG}"'
                }


        }
    }

       

   


      stage("Deploy for production"){
        when{
            branch "main"
        }
           steps{
                    sshagent(['enat-remedy-production']) {
                   sh 'ssh -o StrictHostKeyChecking=no -l  ebdevuat 10.1.12.70      "docker stop kyc-file-filter-web-app | true;     docker rm kyc-file-filter-web-app | true;     docker run -p 5004:80  -d --name kyc-file-filter-web-app 10.1.12.73:5000/kyc-file-filter-front-end:${TAG}"'
                }
            }
    }
}

post{
    always{
        cleanWs()
    }
    failure {
        sh """
        curl -X POST -H "Content-Type: application/json" -d '{"value1":"${JOB_NAME}","value2":"${BUILD_NUMBER}","value3":"Failed"}' https://maker.ifttt.com/trigger/Build_Notification/with/key/c9HE9K84X22YKOKsCiNivz
        """
    }
    success {
        sh """
        curl -X POST -H "Content-Type: application/json" -d '{"value1":"${JOB_NAME}","value2":"${BUILD_NUMBER}","value3":"Successful"}' https://maker.ifttt.com/trigger/Build_Notification/with/key/c9HE9K84X22YKOKsCiNivz
        """
    }

}
}
