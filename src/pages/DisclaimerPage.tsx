const FOREST = '#123b2b'
const GOLD = '#c89b3c'
const GOLDPALE = '#f3e9d2'
const DARK = '#1d1d1d'
const SLATE = '#5f6d73'
const SAGEPALE = '#e7eee7'
const WHITE = '#ffffff'

export default function DisclaimerPage() {
  const sections = [
    {
      title: '1. Medical and Health Disclaimer',
      alert: true,
      content: [
        'PLEASE READ THIS CAREFULLY. THIS IS THE MOST IMPORTANT DISCLAIMER ON THIS SITE.',
        'Nothing on abundance-accepted.com, including articles, wellness tips, the BioFit app, AI-generated meal plans and exercise prescriptions, AI coach conversations, newsletter content, or any other content produced by Abundance Accepted LLC, constitutes medical advice, medical diagnosis, medical treatment, or a substitute for the advice of a qualified healthcare professional.',
        'Abundance Accepted LLC is a wellness education and lifestyle platform — not a medical practice. The founder and owner of Abundance Accepted LLC is not a licensed physician, registered dietitian, certified nutritionist, or licensed mental health professional.',
        'ALWAYS seek the advice of your physician or other qualified health provider before starting any new diet, nutrition plan, exercise program, fasting regimen, or supplementation program. NEVER disregard professional medical advice or delay seeking it because of something you have read or heard on this Site.',
        'If you think you may have a medical emergency, call your doctor or emergency services immediately.',
      ],
    },
    {
      title: '2. Personal Results Disclaimer',
      content: [
        'The personal weight loss story shared on this Site reflects the real experience of D, founder of Abundance Accepted LLC, who lost 80 pounds in 11 months through an all-natural lifestyle approach including whole food nutrition, intermittent fasting, consistent exercise, adequate rest, and daily self-accountability.',
        'THIS RESULT IS NOT TYPICAL AND YOUR RESULTS WILL VARY. Weight loss results depend on many individual factors including age, sex, current health status, medical conditions, medications, starting weight, genetics, adherence to the program, stress levels, sleep quality, and metabolic rate.',
        'Abundance Accepted LLC makes no guarantees, warranties, or representations that you will achieve any specific weight loss result, health improvement, or fitness outcome by following the information or programs on this Site.',
      ],
    },
    {
      title: '3. AI-Generated Content Disclaimer',
      content: [
        'Abundance Accepted LLC uses artificial intelligence technology to generate wellness tips, meal plans, exercise prescriptions, and chat responses through the BioFit app and AI wellness assistant. AI-generated content is produced by automated systems and has not been reviewed or approved by a licensed healthcare professional.',
        'AI-generated meal plans, calorie targets, and exercise recommendations are general suggestions only and are not tailored to your specific medical needs or health conditions. The accuracy and appropriateness of AI-generated content cannot be guaranteed. You assume full personal responsibility for any decisions you make based on AI-generated content.',
        'AI-generated content should always be reviewed by a qualified professional before implementation, especially if you have any medical condition.',
      ],
    },
    {
      title: '4. Affiliate and Earnings Disclaimer',
      content: [
        'Abundance Accepted LLC participates in affiliate marketing programs. Some links on this Site are affiliate links, meaning we may earn a commission if you click on a link and make a purchase, at no additional cost to you.',
        'We are a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. Our books, Wake Up and Workout and Are You Up For The Challenge?, may be promoted through this program.',
        'Abundance Accepted LLC only recommends products and services we genuinely believe in and that align with our all-natural wellness philosophy.',
      ],
    },
    {
      title: '5. Advertising Disclaimer',
      content: [
        'This Site displays advertisements served by Google AdSense and potentially other advertising networks. Abundance Accepted LLC does not endorse the products or services advertised through these networks.',
        'Abundance Accepted LLC is not responsible for the content of external advertisements displayed on this Site. The display of an advertisement does not constitute an endorsement by Abundance Accepted LLC.',
      ],
    },
    {
      title: '6. Testimonials and Success Stories Disclaimer',
      content: [
        'Any testimonials, success stories, or before-and-after results featured on this Site represent individual experiences and results. These results are not typical. Individual results will always vary and depend on many personal factors.',
        'Testimonials are not intended to make claims that our products or services can be used to diagnose, treat, cure, mitigate, or prevent any disease or medical condition.',
      ],
    },
    {
      title: '7. External Links Disclaimer',
      content: [
        'Abundance Accepted LLC may include links to external websites for your convenience and information. These links do not constitute an endorsement of those websites or their content. We have no control over the content, privacy policies, or practices of third-party sites and accept no responsibility for them.',
        'We encourage you to review the privacy policy and terms of service of any external site you visit through links on our Site.',
      ],
    },
    {
      title: '8. Accuracy and Currency of Information',
      content: [
        'While we strive to provide accurate, current, and complete information, Abundance Accepted LLC makes no representations or warranties about the accuracy, reliability, completeness, or timeliness of the content on this Site.',
        'Health and wellness research is constantly evolving. Information that was accurate at the time of publication may become outdated. We recommend consulting current medical literature and healthcare professionals for the most up-to-date guidance.',
      ],
    },
    {
      title: '9. Limitation of Liability',
      content: [
        'To the fullest extent permitted by applicable law, Abundance Accepted LLC, its founder, officers, employees, and affiliates shall not be liable for any direct, indirect, incidental, consequential, special, or punitive damages arising from your use of or reliance on any content, tools, products, or services provided by or through this Site.',
        'Your use of this Site and its content is entirely at your own risk.',
      ],
    },
    {
      title: '10. Contact Us',
      content: [
        'If you have any questions about this Disclaimer, please contact us:\n\nAbundance Accepted LLC\nPO Box 11763\nChandler, AZ 85248\nEmail: admin@abundance-accepted.com\nWebsite: abundance-accepted.com',
      ],
    },
  ]

  return (
    <div style={{ paddingTop: '72px' }}>
      <div
        style={{
          background: `linear-gradient(160deg, ${FOREST}, #0d3d22)`,
          padding: '60px 24px 40px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h1
            style={{
              color: WHITE,
              fontSize: 'clamp(28px,4vw,48px)',
              fontWeight: 900,
              marginBottom: '12px',
            }}
          >
            Disclaimer
          </h1>
          <p style={{ color: SAGEPALE, fontSize: '15px' }}>
            Effective Date: July 2, 2026 | Last Updated: July 2, 2026
          </p>
          <p style={{ color: SAGEPALE, fontSize: '14px', marginTop: '8px' }}>
            abundance-accepted.com
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '60px 24px' }}>
        <div
          style={{
            background: GOLDPALE,
            border: `1px solid ${GOLD}44`,
            borderRadius: '12px',
            padding: '20px 24px',
            marginBottom: '40px',
          }}
        >
          <p style={{ fontSize: '15px', color: DARK, lineHeight: '1.7' }}>
            The information on abundance-accepted.com is for general informational and educational purposes only.
            By using this Site you acknowledge and agree to the following disclaimers in their entirety.
          </p>
        </div>

        {sections.map((section, i) => (
          <div key={i} style={{ marginBottom: '36px' }}>
            <h2
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: FOREST,
                marginBottom: '12px',
                paddingBottom: '8px',
                borderBottom: `2px solid ${GOLD}44`,
              }}
            >
              {section.title}
            </h2>
            {section.content.map((para, j) => (
              <p
                key={j}
                style={{
                  fontSize: '15px',
                  color: j === 0 && section.alert ? '#C0392B' : DARK,
                  fontWeight: j === 0 && section.alert ? 700 : 400,
                  lineHeight: '1.8',
                  marginBottom: '12px',
                  whiteSpace: 'pre-line',
                }}
              >
                {para}
              </p>
            ))}
          </div>
        ))}

        <div
          style={{
            borderTop: `2px solid ${GOLD}44`,
            paddingTop: '24px',
            marginTop: '40px',
            textAlign: 'center',
            fontSize: '13px',
            color: SLATE,
          }}
        >
          Copyright 2026 Abundance Accepted LLC. All Rights Reserved.
        </div>
      </div>
    </div>
  )
}
