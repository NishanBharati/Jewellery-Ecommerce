export default async function seedBlog(prisma, admin) {
  const blog1 = await prisma.blog.create({
    data: {
      title: "How to Choose the Perfect Wedding Jewellery",
      slug: "how-to-choose-perfect-wedding-jewellery",
      excerpt: "Discover how to match bridal jewellery with your dress, ceremony style, and personal elegance for a timeless wedding look.",
      content: `Choosing the perfect wedding jewellery is about more than selecting beautiful pieces. It is about creating harmony between your outfit, your personal style, and the overall atmosphere of the ceremony. Jewellery should enhance your bridal look rather than distract from it.

When your bridal dress has intricate embroidery, stonework, or heavy detailing, it is often better to choose elegant and balanced jewellery. A refined necklace, matching earrings, and coordinated bangles can create a sophisticated appearance without making the overall styling feel crowded.

For brides wearing simpler or more minimal outfits, statement jewellery becomes the centerpiece of the look. In such cases, layered necklaces, richer bridal sets, or elaborate earrings can add the depth and luxury needed to complete the styling beautifully.

Your necklace plays an important role in selecting jewellery. Deep necklaces often pair well with more visible necklaces, while high-neck or richly decorated blouses may work better with bold earrings and lighter necklaces. Hairstyle, makeup, and even the event lighting should also influence your final choices.

Comfort is another essential factor. Wedding events are long, and jewellery that feels too heavy or difficult to manage can become uncomfortable. A good bridal selection should combine visual richness with practical wearability throughout the event.

Gold jewellery remains a strong choice for traditional bridal styling, especially for ceremonies rooted in cultural richness. Diamond and platinum pieces, on the other hand, bring a more modern, premium, and polished character to the bridal look.

Ultimately, the best wedding jewellery is the one that makes you feel confident, graceful, and fully yourself. A thoughtfully chosen combination of rings, necklace, earrings, and bangles can transform your appearance into something timeless and unforgettable.`,
      images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600"],
      isPublished: true,
      publishedAt: new Date("2026-03-31"),
      readTime: 8,
      metaTitle: "How to Choose the Perfect Wedding Jewellery - Eternity Jewelry",
      metaDescription: "Learn expert tips on selecting and styling the perfect wedding jewellery collection for your special day.",
      authorId: admin.id,
    },
  });

  const blog2 = await prisma.blog.create({
    data: {
      title: "Daily Jewellery Care Guide",
      slug: "daily-jewellery-care-guide",
      excerpt: "Learn simple daily care tips to keep your gold, silver, and diamond jewellery shining beautifully for years.",
      content: `Taking proper care of your jewellery ensures that your precious pieces remain beautiful and last for generations. Whether you own gold, silver, or diamond jewellery, proper maintenance is essential.

For gold jewellery, regular wearing actually helps maintain its lustre. However, you should remove it before engaging in strenuous activities or bathing. Once a month, gently clean your gold pieces with lukewarm water and mild soap using a soft brush.

Silver jewellery requires more frequent cleaning as it can tarnish easily. Store silver pieces in a dry environment and use a soft silver cloth to polish regularly. Avoid exposing silver to harsh chemicals or perfumes.

Diamond jewellery is incredibly durable but benefits from regular professional cleaning. Between professional cleanings, you can soak diamonds in warm soapy water and gently clean them with a soft brush.

The general rule for jewellery care is to put jewellery on last and remove it first when dressing and undressing. Always keep jewellery away from direct heat sources and avoid storing different types of metal together.

Professional cleaning and maintenance at least once a year helps maintain the integrity and beauty of your precious jewellery. Many jewellers offer complimentary or affordable cleaning services to keep your collection in pristine condition.`,
      images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600"],
      isPublished: true,
      publishedAt: new Date("2026-03-25"),
      readTime: 6,
      metaTitle: "Daily Jewellery Care Guide - Keep Your Jewelry Shining",
      metaDescription: "Expert guide on caring for gold, silver, and diamond jewellery. Learn proper maintenance tips for lasting beauty.",
      authorId: admin.id,
    },
  });

  const blog3 = await prisma.blog.create({
    data: {
      title: "Gold vs Diamond: Which Is Right for You?",
      slug: "gold-vs-diamond-which-is-right",
      excerpt: "Compare gold and diamond jewellery styles to choose the perfect option for your lifestyle, budget, and personal style.",
      content: `When choosing between gold and diamond jewellery, it's important to understand the differences and benefits of each option. Both are timeless choices but suit different preferences and occasions.

Gold jewellery offers warmth, tradition, and versatility. It works well for both everyday wear and special occasions. Gold comes in different purities and colors (yellow, white, rose), allowing you to find pieces that match your style perfectly. Golden jewellery often features cultural significance and brings a sense of heritage to your collection.

Diamond jewelry represents luxury, brilliance, and modern premium styling. Diamonds catch light beautifully and add sophistication to any look. They are incredibly durable and suitable for everyday wear. Diamond pieces tend to be more expensive but offer unmatched sparkle and timeless elegance.

For traditional and cultural occasions, gold remains the stronger choice, especially in ceremonies rooted in cultural richness. Diamond and platinum pieces, on the other hand, bring a more modern, premium, and polished character.

You don't have to choose just one. Many jewellery collections include both gold and diamond pieces, allowing you to switch based on the occasion and your mood. Consider your lifestyle, budget, and personal preferences when making your selection.

The best choice is ultimately the one that makes you feel confident and beautiful. Whether you prefer the warm charm of gold or the brilliant sparkle of diamonds, invest in pieces that resonate with your personal style and will bring you joy for years to come.`,
      images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600"],
      isPublished: true,
      publishedAt: new Date("2026-03-20"),
      readTime: 7,
      metaTitle: "Gold vs Diamond: Which Jewellery Is Right for You?",
      metaDescription: "Compare gold and diamond jewellery. Find out which is best for your lifestyle, budget, and personal preferences.",
      authorId: admin.id,
    },
  });

  return { blog1, blog2, blog3 };
}