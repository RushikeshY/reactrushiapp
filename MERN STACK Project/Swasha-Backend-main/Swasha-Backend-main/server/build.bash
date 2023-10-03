rm -r static
cd ../../Swasha-Frontend/
npx next build
npx next export
cd ../Swasha-Backend/server
cp -r ../../Swasha-Frontend/out static
docker build -t swasha-backend .
docker tag swasha-backend:latest swasha.azurecr.io/swasha/dev:2.8
# docker push swasha.azurecr.io/swasha/dev:2.7
