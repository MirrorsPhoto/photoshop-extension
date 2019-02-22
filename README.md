[ADOBE PHOTOSHOP CC 2015 JAVASCRIPT SCRIPTING REFERENCE](http://wwwimages.adobe.com/content/dam/Adobe/en/devnet/photoshop/pdfs/photoshop-cc-javascript-ref-2015.pdf)

### Decide how to acquire the certificate
There are two types of code-signing certificate: commercial certificates provided by a trusted certificate authority, and self-signed certificates. Commercial certificates must be purchased from a trusted certificate authority.

- Using CA (Certificate Authority) - Your certificate signed by CA must satisfy these conditions:
	- The root certificate of the code-signing certificate must be installed in the target operating system by
default. This can vary with different variations of an operating system.

	- The issuing certificate authority (CA) of the code-signing certificate must permit you to use that
certificate to sign extensions.

- Creating a self-signed certificate - If you do not have an existing certificate signed by CA, you can self-sign your package by using `ZXPSignCmd` downloaded in the previous step by running the following command:

```
ZXPSignCmd -selfSignedCert <countryCode> <stateOrProvince> <organization> <commonName> <password> <outputPath.p12> [options]
```

| Parameters       | Description                                             | 
| -------------    |:--------------------------------------------------------| 
| countryCode      | The certificate identifying information for your country.| 
| stateOrProvince  | The certificate identifying information for your state or providence.| 
| organization     | The certificate identifying information for your organization.| 
| commonName       | The certificate identifying information for your common name.| 
| password         | The password for the new certificate.|
| outputPath.p12   | The path and file name for the new certificate.| 
| options(locality)| `-locality <code>` If supplied, the locale code to associate with this certificate.| 
| options(orgUnit) | `-orgUnit <name>` If supplied, an organizational unit to associate with this certificate.| 
| options(email)   | `-email <addr>` If supplied, an email address to associate with this certificate.| 
| options(validityDays)| `-validityDays <num>` If supplied, a number of days from the current date-time that this certificate remains valid.| 

Once you run the command, this will output the self-signed certificate at the specified `<outputPath.p12>`.

**Example**
```
./ZXPSignCmd -selfSignedCert RU RO MirrorsPhoto jonkofee dl34op cert.p12
```

### Use `ZXPSignCmd` to package your extension
Once you have the input directory ready, run the following command to finish packaging:

```
ZXPSignCmd -sign <inputDir> <outputZxp> <p12> <p12Password> [options]
```

| Parameters       | Description                                             | 
| -------------    |:--------------------------------------------------------| 
| inputDir         | The path to the folder containing the source files to package.| 
| outputZxp        | The path and file name for the ZXP package.| 
| p12              | The path and file name for the signed certificate.|
| p12Password      | The password for the certificate.| 
| options(tsa)     | `-tsa <timestampURL>` The timestamp server. Examples:<br>http://time.certum.pl/<br>http://timestamp.comodoca.com/rfc3161| 

**Example**
```
./ZXPSignCmd -sign ./dist mirrors.zxp cert.p12 dl34op
```