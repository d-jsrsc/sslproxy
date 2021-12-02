https://mcilis.medium.com/how-to-create-a-server-certificate-with-configuration-using-openssl-ea3d2c4506ac

https://mcilis.medium.com/how-to-create-a-client-certificate-with-configuration-using-openssl-89214dca58ec


661  openssl genrsa -out "root-ca.key" 4096\n
662  openssl req -new -key "root-ca.key" -out "root-ca.csr" -sha256 -subj '/CN=Local Penink Root CA'
663  openssl x509 -req -days 3650 -in "root-ca.csr" -signkey "root-ca.key" -sha256 -out "root-ca.crt" -extfile "root-ca.cnf" -extensions root_ca
664  openssl genrsa -out "server.key" 4096
665  openssl req -new -key "server.key" -out "server.csr" -sha256 -subj '/CN=penink.local'\n
666  openssl x509 -req -days 750 -in "server.csr" -sha256 -CA "root-ca.crt" -CAkey "root-ca.key" -CAcreateserial -out "server.crt" -extfile "server.cnf" -extensions server
667* node server.js
668  openssl genrsa -out "client.key" 4096\n
669  openssl req -new -key "client.key" -out "client.csr" -sha256 -subj '/CN=Local Penink Client'
670  openssl x509 -req -days 750 -in "client.csr" -sha256 -CA "root-ca.crt" -CAkey "root-ca.key" -CAcreateserial -out "client.crt" -extfile "client.cnf" -extensions client
671  cat client.key client.crt root-ca.crt > client.pem
672  openssl pkcs12 -export -out client.pfx -inkey client.key -in client.pem -certfile root-ca.crt\n

