FROM openjdk:latest
EXPOSE 9090
VOLUME /slm
ADD legal-case-rest-1.0.0.jar legal-case.jar
ADD config config
RUN sh -c 'touch /legal-case.jar'
ENV JAVA_OPTS=""
ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -jar /legal-case.jar" ]