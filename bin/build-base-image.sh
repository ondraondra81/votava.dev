#!/bin/bash
set -e

# Konfigurace
REGISTRY="registry.votava.dev"
NAMESPACE="votavadev"
IMAGE_NAME="base"
TAG=$(date +%Y%m%d)

# Sestavení base image
echo "Sestavení base image: ${IMAGE_NAME}:${TAG}"
docker build \
  --file docker/Dockerfile.base \
  --tag ${IMAGE_NAME}:${TAG} \
  --tag ${IMAGE_NAME}:latest \
  .

# Přidání tagů pro registry
echo "Přidání tagů pro registry"
docker tag ${IMAGE_NAME}:${TAG} ${REGISTRY}/${NAMESPACE}/${IMAGE_NAME}:${TAG}
docker tag ${IMAGE_NAME}:${TAG} ${REGISTRY}/${NAMESPACE}/${IMAGE_NAME}:latest

# Odeslání do registru
echo "Odeslání do registru: ${REGISTRY}/${NAMESPACE}/${IMAGE_NAME}:${TAG}"
docker push ${REGISTRY}/${NAMESPACE}/${IMAGE_NAME}:${TAG}
docker push ${REGISTRY}/${NAMESPACE}/${IMAGE_NAME}:latest

echo "Base image byl úspěšně sestaven a odeslán do registru."
echo "Použijte tento image v Dockerfile.app s příkazem:"
echo "docker build --build-arg BASE_IMAGE=${REGISTRY}/${NAMESPACE}/${IMAGE_NAME}:${TAG} -f docker/Dockerfile.app -t votavadev-app:latest ."