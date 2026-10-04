import { experience } from '@/data';
import Entry from './Entry';
import Section from './Section';

export default function Experience() {
  return (
    <Section id="experience" title="experience">
      <ul className="space-y-12">
        {experience.map((item) => (
          <Entry key={item.id} item={item} />
        ))}
      </ul>
    </Section>
  );
}
