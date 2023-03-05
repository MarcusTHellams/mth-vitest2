import nodemailer from 'nodemailer';

export async function main() {
  try {
    const transporter = nodemailer.createTransport({
      host: 'localhost',
      port: 1025,
      secure: false,
    });

    const { messageId } = await transporter.sendMail({
      from: 'mhellams@hotmail.com',
      to: 'mhellams@gmail.com',
      subject: 'Test',
      // text: 'We will See',
      html: `<h1>Hello There</h1>
    <p>
      <img
        src="https://scontent-iad3-2.xx.fbcdn.net/v/t1.6435-9/61302779_10157394376977072_2768401396330921984_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=e3f864&_nc_ohc=4Qy03Ekn_hgAX9DE3Bz&_nc_ht=scontent-iad3-2.xx&oh=00_AfBVWZLzGIFVJYrWRujTl0Xl_cPtl4rPxy19wMaQPYT3bA&oe=6428EC6E"
      />
    </p>
    `,
    });
    console.log('🚀 ~ file: index.ts:16 ~ main ~ messageId:', messageId);
  } catch (error) {
    console.error(
      '🚀 ~ file: index.ts:26 ~ main ~ error:',
      (error as Error).message
    );
  }
}
