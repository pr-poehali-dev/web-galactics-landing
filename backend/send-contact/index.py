import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def handler(event, context):
    """Отправка заявки с формы обратной связи на email"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    cors = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}

    if event.get('httpMethod') != 'POST':
        return {'statusCode': 405, 'headers': cors, 'body': json.dumps({'error': 'Method not allowed'})}

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    email = body.get('email', '').strip()
    message = body.get('message', '').strip()
    source = body.get('source', 'form')

    if not name or not phone or not email:
        return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'Missing required fields'})}

    html_email = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
    </head>
    <body style="margin:0;padding:0;background-color:#0a0a1a;font-family:'Segoe UI',Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a1a;padding:40px 20px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#12122a 0%,#1a1a3e 100%);border-radius:16px;border:1px solid rgba(139,92,246,0.3);box-shadow:0 0 30px rgba(139,92,246,0.15);">
                        <tr>
                            <td style="padding:32px 40px;text-align:center;border-bottom:1px solid rgba(139,92,246,0.2);">
                                <h1 style="margin:0;font-size:24px;color:#a78bfa;letter-spacing:2px;">&#127756; Web Galactics</h1>
                                <p style="margin:8px 0 0;font-size:13px;color:#6b7280;">Новая заявка с сайта</p>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding:32px 40px;">
                                <div style="background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.2);border-radius:12px;padding:8px 16px;margin-bottom:24px;text-align:center;">
                                    <span style="color:#a78bfa;font-size:13px;">Источник: {source}</span>
                                </div>

                                <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                                            <span style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Имя</span><br>
                                            <span style="color:#e5e7eb;font-size:16px;font-weight:600;">{name}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                                            <span style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Телефон</span><br>
                                            <a href="tel:{phone}" style="color:#06b6d4;font-size:16px;font-weight:600;text-decoration:none;">{phone}</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                                            <span style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Email</span><br>
                                            <a href="mailto:{email}" style="color:#06b6d4;font-size:16px;font-weight:600;text-decoration:none;">{email}</a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding:12px 0;">
                                            <span style="color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Сообщение</span><br>
                                            <p style="color:#e5e7eb;font-size:15px;line-height:1.6;margin:8px 0 0;white-space:pre-wrap;">{message if message else '—'}</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding:20px 40px;text-align:center;border-top:1px solid rgba(139,92,246,0.2);">
                                <p style="margin:0;font-size:12px;color:#4b5563;">Web Galactics &mdash; Космическая веб-студия</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    """

    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    sender_email = 'Artkov87@mail.ru'
    recipient_email = 'Artkov87@mail.ru'

    if not smtp_password:
        return {'statusCode': 500, 'headers': cors, 'body': json.dumps({'error': 'SMTP not configured'})}

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка от {name} — Web Galactics'
    msg['From'] = f'Web Galactics <{sender_email}>'
    msg['To'] = recipient_email
    msg['Reply-To'] = email

    text_part = MIMEText(f"Новая заявка\n\nИмя: {name}\nТелефон: {phone}\nEmail: {email}\nСообщение: {message}\nИсточник: {source}", 'plain', 'utf-8')
    html_part = MIMEText(html_email, 'html', 'utf-8')

    msg.attach(text_part)
    msg.attach(html_part)

    with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
        server.login(sender_email, smtp_password)
        server.sendmail(sender_email, [recipient_email], msg.as_string())

    return {
        'statusCode': 200,
        'headers': cors,
        'body': json.dumps({'success': True, 'message': 'Email sent successfully'})
    }
