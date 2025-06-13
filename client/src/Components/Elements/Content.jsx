import image from "../../assets/image.jpeg";
import book from "../../assets/book.jpg";

function Content() {
  return (
    <div className="bg-[#E0ECFF] py-10 px-4 md:px-16 transition-all duration-500 ease-in-out">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-center text-black mb-4 mt-8 transition-all duration-500 ease-in-out">
        WHO ARE WE?
      </h1>

      {/* Paragraph under the heading */}
      <p className="text-black text-lg leading-relaxed text-justify pt-8 mb-16 transition-all duration-500 ease-in-out">
        In the vast digital landscape, communities flourish when they embrace
        inclusivity, creativity, and a sense of belonging. Lo Club Uwu stands
        out as a unique online sanctuary dedicated to spreading joy, kindness,
        and lighthearted fun, inspired by the affectionate and playful “uwu”
        expression that has captivated internet culture. Lo Club Uwu is more
        than just a club—it’s a lifestyle and a mindset. The term “uwu” is an
        emoticon representing a cute face, often used to convey happiness,
        warmth, and affection. This emoticon has become symbolic of the
        wholesome, friendly interactions that Lo Club Uwu encourages among its
        members. The club embodies the spirit of embracing one’s softer side in
        a world that often feels fast-paced and overwhelming. At its core, Lo
        Club Uwu is a community built on the pillars of kindness,
        self-expression, and creative exploration. Members from all walks of
        life gather here to share their passions, whether that be art, music,
        storytelling, or simply uplifting messages. The club fosters an
        environment where people feel safe to express their authentic selves
        without judgment or negativity. One of the defining features of Lo Club
        Uwu is its emphasis on creativity. The club regularly hosts events such
        as digital art contests, collaborative storytelling sessions, and music
        sharing parties. These activities inspire members to tap into their
        imagination and share their unique talents with the community. The sense
        of camaraderie that arises from these shared creative experiences
        strengthens the bonds between members, making Lo Club Uwu feel like a
        second home. Moreover, Lo Club Uwu promotes mental wellness and positive
        interactions. In an age where social media can sometimes breed toxicity,
        the club acts as a refreshing alternative. Its moderators actively
        nurture respectful dialogue and encourage members to support one another
        through challenging times. The atmosphere is intentionally uplifting,
        filled with encouraging words, cute emojis, and friendly gestures that
        brighten everyone’s day. The visual identity of Lo Club Uwu is as
        charming as its ethos. The club’s branding incorporates soft pastel
        colors, adorable mascots, and whimsical designs that reflect the warm
        and inviting nature of the community. This aesthetic creates a cozy and
        welcoming vibe that attracts people looking for a respite from the
        harsher edges of online spaces. In addition to online interactions, Lo
        Club Uwu occasionally organizes virtual meetups, workshops, and charity
        drives, bringing members closer together and giving back to broader
        communities. These initiatives exemplify the club’s commitment to making
        a positive impact both within and outside its digital borders. The
        inclusivity of Lo Club Uwu is one of its greatest strengths. Everyone is
        welcome—regardless of age, background, or interests. The club celebrates
        diversity and encourages members to learn from each other’s experiences
        and perspectives. This open-mindedness helps create a rich, vibrant
        tapestry of friendships and collaborations. In summary, Lo Club Uwu is a
        delightful digital haven where warmth, creativity, and kindness reign
        supreme. It invites individuals to embrace their gentler sides, express
        themselves freely, and connect with like-minded souls in a supportive
        and joyful environment. Whether you’re looking for a place to share your
        art, find inspiration, or simply enjoy some wholesome fun, Lo Club Uwu
        welcomes you with open arms and an adorable “uwu” smile.
      </p>

      {/* Image and second paragraph in styled card */}
      <div className="bg-[#fcfcfc] rounded-2xl shadow-xl p-6 flex flex-col md:flex-row items-center gap-10 transition-all duration-700 ease-in-out hover:scale-[1.01]">
        {/* Image */}
        <div className="md:w-1/3 flex justify-center">
          <img
            src={image}
            alt="Who we are"
            className="w-full max-w-[400px] h-auto max-h-[400px] rounded-xl shadow-md "
          />
        </div>

        {/* Paragraph beside image */}
        <div className="w-full md:w-2/3 text-black text-lg leading-relaxed text-justify">
          <h1 className="uppercase text-2xl font-bold text-left mb-8">
            Team Work
          </h1>
          <p>
            Our team works tirelessly on a range of community projects — from
            education to environmental sustainability — driven by our shared
            values...
          </p>
        </div>
      </div>

      {/* Inverted image section */}
      <div className="bg-[#fcfcfc] rounded-2xl shadow-xl p-6 flex flex-col md:flex-row items-center gap-10 mt-10 transition-all duration-700 ease-in-out hover:scale-[1.01]">
        {/* Paragraph beside image */}
        <div className="w-full md:w-2/3 text-black text-lg leading-relaxed text-justify">
          <h1 className="uppercase text-2xl font-bold text-left mb-8">
            Team Work
          </h1>
          <p>
            Our team works tirelessly on a range of community projects — from
            education to environmental sustainability — driven by our shared
            values...
          </p>
        </div>

        {/* Image on the right */}
        <div className="md:w-1/3 flex justify-center">
          <img
            src={image}
            alt="Who we are"
            className="w-full max-w-[400px] h-auto max-h-[400px] rounded-xl shadow-md transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>

      {/* Awards Section */}
      <div className="px-4 sm:px-6 lg:px-20 xl:px-32 py-10 transition-all duration-700 ease-in-out">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-[black]">
          Awards
        </h1>

        <div className="mt-8 flex justify-center">
          <img
            src={book}
            alt="image book"
            className="w-full  h-auto rounded-xl shadow-md object-cover "
          />
        </div>
      </div>
    </div>
  );
}

export default Content;
