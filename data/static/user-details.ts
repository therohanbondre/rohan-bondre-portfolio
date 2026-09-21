import { type UserDetailsResponse } from "@/lib/objects";

// ─── PROFILE PHOTO ────────────────────────────────────────────────────────────
// Upload your photo to Cloudinary, GitHub, or Imgur and replace the URL below.
// ─────────────────────────────────────────────────────────────────────────────

export const staticUserDetails: UserDetailsResponse = {
  cover_image: "/images/profile.png.png",

  about: `I'm a **Computer Engineering graduate** with a strong interest in **Software Engineering, Operating Systems, System Design, Computer Networks, Artificial Intelligence, Cybersecurity, and Cloud Computing**. I enjoy understanding how systems work internally, designing reliable solutions, and building software that is **efficient, scalable, secure, and maintainable**.

I'm particularly interested in **backend development, databases, APIs, and system architecture** — working close to the fundamentals and understanding data flow, application logic, and how different components fit together rather than treating technologies as black boxes.

I also have a strong **testing and problem-solving mindset**. I like going beyond the happy path by designing comprehensive test cases, identifying edge cases, debugging failures, and evaluating systems for **correctness, reliability, performance, security, and real-world resilience**.

Since my diploma days, I've been fascinated by taking applications apart to understand how they work, then **re-engineering and improving them from first principles** with cleaner logic, better architecture, and practical engineering decisions. Through academic projects, internships, and personal projects, I've gained hands-on experience with **Java, Python, JavaScript, React, Node.js, SQL, REST APIs, AI/ML, Generative AI, and cloud technologies**.

Outside technology, I enjoy **reading Marathi literature, cooking, swimming, cycling, trekking, and helping my family with farming**. Growing up around farming has taught me patience, consistency, resourcefulness, and the importance of improving processes step by step — principles I carry into my engineering work as well.

[Let's build something meaningful together.](/contact)`,
};
