"use client";

import { useEffect, useRef, type CSSProperties, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { STICKER_GEOMETRY } from "@/content/studio-stickers";
import { projectHref, type StudioProject } from "@/content/studio";
import { mountSticker, stickerOf } from "@/lib/studio/stickerFx";

interface StickerViewProps {
  project: StudioProject;
  /** Render as a plain element (project hero) instead of a link. */
  link?: boolean;
  rot?: number;
  mini?: boolean;
  showTag?: boolean;
  /** Board placement (offsets and tag position). */
  placement?: boolean;
  /** Fold on hover / click. Off on project pages, where stickers only tilt and shine. */
  peel?: boolean;
}

export default function StickerView({
  project,
  link = true,
  rot,
  mini = false,
  showTag = true,
  placement = false,
  peel = true,
}: StickerViewProps) {
  const ref = useRef<HTMLAnchorElement & HTMLDivElement>(null);
  const router = useRouter();
  const geo = STICKER_GEOMETRY[project.key];
  const href = projectHref(project);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { cleanup } = mountSticker(el, project.peel, peel);
    return cleanup;
  }, [project.peel, peel]);

  const style = {
    "--iw": geo.w,
    "--ih": geo.h,
    "--rot": `${rot ?? project.rot}deg`,
    ...(placement
      ? { "--dx": `${project.board.dx}%`, "--dy": `${project.board.dy}%` }
      : {}),
    ...(placement && project.board.tt ? { "--tt": project.board.tt } : {}),
  } as CSSProperties;

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    )
      return;
    e.preventDefault();
    const s = ref.current ? stickerOf(ref.current) : undefined;
    if (!s || !peel) {
      router.push(href);
      return;
    }
    if (s.busy) return;
    s.point(e);
    s.peelOff(() => router.push(href));
  };

  const inner = (
    <>
      <span className="stk-tilt">
        <span className="stk-lift">
          <span className="stk-3d">
            <span className="stk-body">
              <span className="stk-front">
                <span className="art" />
                <span className="holo" />
                <span className="sheen" />
                <span className="glare" />
              </span>
              <span className="stk-flapwrap">
                <span className="stk-flap" />
              </span>
            </span>
          </span>
        </span>
      </span>
      {showTag && (
        <span className="tag" aria-hidden="true">
          {project.path}
        </span>
      )}
    </>
  );

  const className = `stk s-${project.key}${mini ? " mini" : ""}`;
  const common = { "data-key": project.key, "data-spin": project.spin, style };

  return link ? (
    <a
      ref={ref}
      className={className}
      href={href}
      aria-label={`${project.name}: ${project.line}`}
      onClick={onClick}
      {...common}
    >
      {inner}
    </a>
  ) : (
    <div ref={ref} className={className} aria-hidden="true" {...common}>
      {inner}
    </div>
  );
}
