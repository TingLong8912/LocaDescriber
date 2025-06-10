#!/bin/bash

# Namespace and app details
NAMESPACE=tw-sgis
APP_FRONTEND=tw-sgis-locadescriber-frontend
URL_FRONTEND=locadescriber.sgis.tw

IMGPORT_FRONTEND=3000

deploy_frontend() {
  echo "Deploying Frontend..."

  cat << EOF | kubectl apply -n ${NAMESPACE} -f -
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ${APP_FRONTEND}-ingress
  annotations:
    nginx.ingress.kubernetes.io/proxy-body-size: "0"
    nginx.ingress.kubernetes.io/proxy-read-timeout: "600"
    nginx.ingress.kubernetes.io/proxy-send-timeout: "600"
    ingress.kubernetes.io/ssl-redirect: "true"
    ingress.kubernetes.io/browser-xss-filter: "true"
    ingress.kubernetes.io/content-type-nosniff: "true"
  labels:
    app: ${APP_FRONTEND}
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - ${URL_FRONTEND}
    secretName: ${NAMESPACE}-secret
  rules:
  - host: ${URL_FRONTEND}
    http:
      paths:
      - path: "/"
        pathType: Prefix
        backend:
          service:
            name: ${APP_FRONTEND}-service
            port:
              number: ${IMGPORT_FRONTEND}
---
apiVersion: v1
kind: Service
metadata:
  name: ${APP_FRONTEND}-service
  labels:
    app: ${APP_FRONTEND}
spec:
  ports:
  - name: web
    protocol: TCP
    port: ${IMGPORT_FRONTEND}
    targetPort: ${IMGPORT_FRONTEND}
  selector:
    app: ${APP_FRONTEND}
  type: LoadBalancer
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${APP_FRONTEND}
  labels:
    app: ${APP_FRONTEND}
spec:
  replicas: 1
  selector:
    matchLabels:
      app: ${APP_FRONTEND}
  template:
    metadata:
      labels:
        app: ${APP_FRONTEND}
    spec:
      imagePullSecrets:
        - name: registrykey-dkr-tw
      containers:
      - name: ${APP_FRONTEND}-web
        image: ${IMAGE_NAME_FRONTEND}-${VERSION}
        imagePullPolicy: Always
        ports:
        - name: web
          containerPort: ${IMGPORT_FRONTEND}
EOF

  kubectl -n ${NAMESPACE} patch Deployment ${APP_FRONTEND} -p "{\"spec\":{\"template\":{\"metadata\":{\"labels\":{\"date\":\"`date +'%s'`\"}}}}}"
}

deploy_frontend